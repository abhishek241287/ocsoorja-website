import { Router, type IRouter } from "express";
import healthRouter from "./health";
import adminRouter from "./admin";
import contactRouter from "./contact";
import blogPublishRouter from "./blog-publish";
import galleryPublishRouter from "./gallery-publish";
import videosRouter from "./videos";
import storageRouter from "./storage";

const router: IRouter = Router();

router.use(healthRouter);
router.use(adminRouter);
router.use(contactRouter);
router.use(blogPublishRouter);
router.use(galleryPublishRouter);
router.use("/videos", videosRouter);
router.use(storageRouter);

export default router;
