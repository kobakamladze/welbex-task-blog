"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const userRouter = express_1.default.Router();
/*
    POST /api/user/register

    User registration
*/
userRouter.post("/register", userController_1.default.register);
/*
    POST /api/user/login

    User authorization
*/
userRouter.post("/login", userController_1.default.login);
/*
    DELETE /api/user/delete

    Deletes user and all associated documents
*/
userRouter.delete("/delete", authMiddleware_1.default, userController_1.default.delete);
exports.default = userRouter;
