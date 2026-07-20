// ---------------------------------------------------------------------------
// Admin Auth Routes
//
// GET  /admin/me      — returns { authenticated: boolean }
// POST /admin/login   — validates password, sets signed httpOnly cookie
// POST /admin/logout  — clears the admin cookie
// ---------------------------------------------------------------------------

import { Router, type IRouter, type Request, type Response } from "express";
import {
  isAdminAuthenticated,
  setAdminCookie,
  clearAdminCookie,
} from "../lib/adminAuth";

const router: IRouter = Router();

router.get("/admin/me", (req: Request, res: Response): void => {
  res.json({ authenticated: isAdminAuthenticated(req) });
});

router.post("/admin/login", (req: Request, res: Response): void => {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    res.status(503).json({
      error: "Admin access not configured — set the ADMIN_PASSWORD secret.",
    });
    return;
  }

  const { password } = req.body as { password?: string };
  if (!password || password !== adminPassword) {
    res.status(401).json({ error: "Incorrect password" });
    return;
  }

  setAdminCookie(res);
  req.log.info("Admin login successful");
  res.json({ ok: true });
});

router.post("/admin/logout", (_req: Request, res: Response): void => {
  clearAdminCookie(res);
  res.json({ ok: true });
});

export default router;
