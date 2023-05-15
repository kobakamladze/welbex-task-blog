import { NextFunction, Request, Response } from "express";
import { Post } from "@prisma/client";

import ApiError from "../error/apiError";
import PostService from "../services/postsService";

export default class PostsController {
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    // const limit: number = req.query?.limit ? Number(req.query.limit) : 20;
    const limit: number = 20;
    const page: number = req.query?.page ? Number(req.query.page) : 1;

    let offset: number = page * limit - limit;
    const postsData: { posts: Post[] | []; count: number } =
      await PostService.getPosts({ limit, offset });

    res.send(postsData);
  }

  public static async create(req: Request, res: Response, next: NextFunction) {
    const imagePath: string = req.file ? req.file.path : "";
    const {
      data,
      authorId,
    }: { data: Omit<Post, "id" | "authorId">; authorId: string } = JSON.parse(
      req.body.data
    );

    const postData = { ...data, imagePath };
    let newPost;
    try {
      newPost = await PostService.create(postData, authorId);
    } catch (error) {
      return next(error);
    }

    res.send(newPost);
  }

  public static async edit(req: Request, res: Response, next: NextFunction) {
    const id: string = req.params.postId as string;
    if (!id) return next(ApiError.badRequest("Post ID was not provided"));

    const data = req.body;
    const updatedData: {
      title?: string;
      content?: string;
      authorId: string;
      imagePath?: string;
    } = { ...data };

    if (req.file) updatedData.imagePath = req.file.path;

    let postEditResponse;
    try {
      postEditResponse = await PostService.edit({ id, ...data });
    } catch (error) {
      return next(error);
    }

    res.send(postEditResponse);
  }

  public static async delete(req: Request, res: Response, next: NextFunction) {
    const id: string = req.params.postId as string;
    if (!id) return next(ApiError.badRequest("Post ID was not provided"));

    const { authorId }: { authorId: string } = req.body;

    let postDeleteResponse;
    try {
      postDeleteResponse = await PostService.delete({ id, authorId });
    } catch (error) {
      return next(error);
    }

    res.send(postDeleteResponse);
  }
}
