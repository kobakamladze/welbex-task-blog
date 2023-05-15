import express from "express";

import userRouter from "./userRoute";
import postsRoutes from "./postsRoutes";

const router = express.Router();

router.use("/user", userRouter);
router.use("/post", postsRoutes);

export default router;
