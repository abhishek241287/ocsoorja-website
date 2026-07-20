import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// Trust Replit's reverse proxy so req.ip reflects the real client IP,
// which express-rate-limit needs to correctly identify and limit requests.
app.set("trust proxy", 1);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
// The blog publisher uploads a base64 cover image, so it needs a larger body
// limit than the default 100kb. Must be registered BEFORE the global parser.
app.use("/api/blog/publish", express.json({ limit: "15mb" }));
// The gallery publisher uploads up to 20 base64 photos in one request.
app.use("/api/gallery/publish", express.json({ limit: "150mb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
