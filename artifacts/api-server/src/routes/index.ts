import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import blogPublishRouter from "./blog-publish";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(blogPublishRouter);

export default router;
