import express from "express";

import PostsController from "../controllers/postsController";
import authMiddleware from "../middlewares/authMiddleware";
import uploadMiddleware from "../middlewares/uploadMiddleware";

const postsRoutes = express.Router();

/*
    GET /api/post

    Query posts
*/
postsRoutes.get("/", PostsController.getAll);

/*
    POST /api/post/create
    
    Creates new post
*/
postsRoutes.post(
  "/create",
  authMiddleware,
  uploadMiddleware.single("image"),
  PostsController.create
);

/*
    PUT /api/post/edit/:postId
    
    Edits existing post
*/
postsRoutes.put(
  "/edit/:postId",
  authMiddleware,
  uploadMiddleware.single("image"),
  PostsController.edit
);

/*
    DELETE /api/post/delete/:postId

    Deletes post
*/
postsRoutes.delete("/delete/:postId", authMiddleware, PostsController.delete);

export default postsRoutes;
