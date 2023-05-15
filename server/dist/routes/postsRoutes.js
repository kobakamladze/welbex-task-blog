"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postsController_1 = __importDefault(require("../controllers/postsController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const uploadMiddleware_1 = __importDefault(require("../middlewares/uploadMiddleware"));
const postsRoutes = express_1.default.Router();
/*
    GET /api/post

    Query posts
*/
postsRoutes.get("/", postsController_1.default.getAll);
/*
    POST /api/post/create
    
    Creates new post
*/
postsRoutes.post("/create", authMiddleware_1.default, uploadMiddleware_1.default.single("image"), postsController_1.default.create);
/*
    PUT /api/post/edit/:postId
    
    Edits existing post
*/
postsRoutes.put("/edit/:postId", authMiddleware_1.default, uploadMiddleware_1.default.single("image"), postsController_1.default.edit);
/*
    DELETE /api/post/delete/:postId

    Deletes post
*/
postsRoutes.delete("/delete/:postId", authMiddleware_1.default, postsController_1.default.delete);
exports.default = postsRoutes;
