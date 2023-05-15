import { Post, PrismaClient } from "@prisma/client";

import ApiError from "../error/apiError";

export default class PostService {
  private static prisma = new PrismaClient();

  public static async create(
    postData: Omit<Post, "id" | "authorId">,
    authorId: string
  ) {
    const post = await this.prisma.post.create({
      data: {
        ...postData,
        authorId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return post;
  }

  public static async edit({
    id,
    authorId,
    title,
    content,
  }: {
    id: string;
    authorId: string;
    title?: string;
    content?: string;
  }) {
    const targetPost: number = await this.prisma.post.count({
      where: { id, authorId },
    });

    if (!targetPost)
      throw ApiError.badRequest(
        "post does not exist you don't have permition to edit it"
      );
    if (!title && !content)
      throw ApiError.badRequest("New data were not provided");

    const newPostData =
      title && content
        ? { title, content }
        : title && !content
        ? { title }
        : { content };

    return await this.prisma.post.update({
      data: { ...newPostData, updatedAt: new Date() },
      where: {
        id,
      },
    });
  }

  public static async getPosts({
    offset = 0,
    limit,
  }: {
    offset: number;
    limit: number;
  }) {
    const postsAmount: number = await this.prisma.post.count();
    const posts: Post[] | null = await this.prisma.post.findMany({
      skip: offset,
      take: limit,
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return { posts, count: postsAmount };
  }

  public static async delete({
    id,
    authorId,
  }: {
    id: string;
    authorId: string;
  }) {
    const targetPost: number = await this.prisma.post.count({
      where: { id, authorId },
    });
    if (!targetPost)
      throw ApiError.badRequest(
        "post doen not exist or you don't have permition to edit it"
      );

    const post = await this.prisma.post.delete({ where: { id } });
    return post;
  }
}
