// ---------------------------------------------------------------------------
// Object Storage Routes
//
// POST /storage/uploads/request-url  — admin only, returns GCS presigned PUT URL
// GET  /storage/public-objects/*     — unconditionally public (app assets)
// GET  /storage/objects/*            — serves uploaded objects with Range support
// ---------------------------------------------------------------------------

import { Readable } from "stream";
import { Router, type IRouter, type Request, type Response } from "express";
import { requireAdmin } from "../lib/adminAuth";
import { ObjectNotFoundError, ObjectStorageService } from "../lib/objectStorage";

const router: IRouter = Router();
const storage = new ObjectStorageService();

// ── POST /storage/uploads/request-url ───────────────────────────────────────
router.post(
  "/storage/uploads/request-url",
  requireAdmin,
  async (req: Request, res: Response): Promise<void> => {
    const body = req.body as { name?: unknown; size?: unknown; contentType?: unknown };
    if (!body.name || typeof body.name !== "string" ||
        body.size === undefined || typeof body.size !== "number" ||
        !body.contentType || typeof body.contentType !== "string") {
      res.status(400).json({ error: "name (string), size (number), and contentType (string) are required" });
      return;
    }

    try {
      const { name, size, contentType } = body as { name: string; size: number; contentType: string };
      const uploadURL = await storage.getObjectEntityUploadURL();
      const objectPath = storage.normalizeObjectEntityPath(uploadURL);
      res.json({ uploadURL, objectPath, metadata: { name, size, contentType } });
    } catch (err) {
      req.log.error({ err }, "Error generating presigned upload URL");
      res.status(500).json({ error: "Failed to generate upload URL" });
    }
  },
);

// ── GET /storage/public-objects/* ────────────────────────────────────────────
router.get(
  "/storage/public-objects/*filePath",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const raw = req.params.filePath as string | string[];
      const filePath = Array.isArray(raw) ? raw.join("/") : raw;
      const file = await storage.searchPublicObject(filePath);
      if (!file) {
        res.status(404).json({ error: "File not found" });
        return;
      }
      const response = await storage.downloadObject(file);
      res.status(response.status);
      response.headers.forEach((value, key) => res.setHeader(key, value));
      if (response.body) {
        Readable.fromWeb(response.body as ReadableStream<Uint8Array>).pipe(res);
      } else {
        res.end();
      }
    } catch (err) {
      req.log.error({ err }, "Error serving public object");
      res.status(500).json({ error: "Failed to serve object" });
    }
  },
);

// ── GET /storage/objects/* ────────────────────────────────────────────────────
// Serves uploaded objects (videos, thumbnails). Supports HTTP Range for seeking.
router.get(
  "/storage/objects/*path",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const raw = req.params.path as string | string[];
      const wildcardPath = Array.isArray(raw) ? raw.join("/") : raw;
      const objectPath = `/objects/${wildcardPath}`;
      const objectFile = await storage.getObjectEntityFile(objectPath);

      const [metadata] = await objectFile.getMetadata();
      const contentType =
        (metadata.contentType as string) || "application/octet-stream";
      const totalSize = Number(metadata.size ?? 0);

      const rangeHeader = req.headers["range"];

      if (rangeHeader && totalSize > 0) {
        // Parse "bytes=start-end"
        const match = rangeHeader.match(/bytes=(\d+)-(\d*)/);
        if (!match) {
          res.status(416).set("Content-Range", `bytes */${totalSize}`).end();
          return;
        }
        const start = parseInt(match[1]!, 10);
        const end = match[2] ? parseInt(match[2], 10) : totalSize - 1;

        if (start >= totalSize) {
          res.status(416).set("Content-Range", `bytes */${totalSize}`).end();
          return;
        }

        res.writeHead(206, {
          "Content-Range": `bytes ${start}-${end}/${totalSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": end - start + 1,
          "Content-Type": contentType,
          "Cache-Control": "private, max-age=3600",
        });
        objectFile.createReadStream({ start, end }).pipe(res);
      } else {
        res.writeHead(200, {
          "Content-Type": contentType,
          "Accept-Ranges": "bytes",
          ...(totalSize > 0 && { "Content-Length": totalSize }),
          "Cache-Control": "private, max-age=3600",
        });
        objectFile.createReadStream().pipe(res);
      }
    } catch (err) {
      if (err instanceof ObjectNotFoundError) {
        res.status(404).json({ error: "Object not found" });
        return;
      }
      req.log.error({ err }, "Error serving object");
      res.status(500).json({ error: "Failed to serve object" });
    }
  },
);

export default router;
