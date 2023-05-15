import express from "express";

import UserController from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const userRouter = express.Router();

/*
    POST /api/user/register

    User registration
*/
userRouter.post("/register", UserController.register);

/*
    POST /api/user/login

    User authorization
*/
userRouter.post("/login", UserController.login);

/*
    DELETE /api/user/delete

    Deletes user and all associated documents
*/
userRouter.delete("/delete", authMiddleware, UserController.delete);

export default userRouter;
