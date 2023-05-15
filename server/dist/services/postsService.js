"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const apiError_1 = __importDefault(require("../error/apiError"));
class PostService {
    static async create(postData, authorId) {
        const post = await this.prisma.post.create({
            data: Object.assign(Object.assign({}, postData), { authorId, createdAt: new Date(), updatedAt: new Date() }),
        });
        return post;
    }
    static async edit({ id, authorId, title, content, }) {
        const targetPost = await this.prisma.post.count({
            where: { id, authorId },
        });
        if (!targetPost)
            throw apiError_1.default.badRequest("post does not exist you don't have permition to edit it");
        if (!title && !content)
            throw apiError_1.default.badRequest("New data were not provided");
        const newPostData = title && content
            ? { title, content }
            : title && !content
                ? { title }
                : { content };
        return await this.prisma.post.update({
            data: Object.assign(Object.assign({}, newPostData), { updatedAt: new Date() }),
            where: {
                id,
            },
        });
    }
    static async getPosts({ offset = 0, limit, }) {
        const postsAmount = await this.prisma.post.count();
        const posts = await this.prisma.post.findMany({
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
    static async delete({ id, authorId, }) {
        const targetPost = await this.prisma.post.count({
            where: { id, authorId },
        });
        if (!targetPost)
            throw apiError_1.default.badRequest("post doen not exist or you don't have permition to edit it");
        const post = await this.prisma.post.delete({ where: { id } });
        return post;
    }
}
PostService.prisma = new client_1.PrismaClient();
exports.default = PostService;
