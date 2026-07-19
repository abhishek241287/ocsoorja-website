import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import blogPublishRouter from "./blog-publish";
import galleryPublishRouter from "./gallery-publish";
import videosRouter from "./videos";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(blogPublishRouter);
router.use(galleryPublishRouter);
router.use("/videos", videosRouter);

export default router;
