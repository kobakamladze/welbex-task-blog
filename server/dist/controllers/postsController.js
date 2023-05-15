"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = __importDefault(require("../error/apiError"));
const postsService_1 = __importDefault(require("../services/postsService"));
class PostsController {
    static async getAll(req, res, next) {
        var _a;
        // const limit: number = req.query?.limit ? Number(req.query.limit) : 20;
        const limit = 20;
        const page = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) ? Number(req.query.page) : 1;
        let offset = page * limit - limit;
        const postsData = await postsService_1.default.getPosts({ limit, offset });
        res.send(postsData);
    }
    static async create(req, res, next) {
        const imagePath = req.file ? req.file.path : "";
        const { data, authorId, } = JSON.parse(req.body.data);
        const postData = Object.assign(Object.assign({}, data), { imagePath });
        let newPost;
        try {
            newPost = await postsService_1.default.create(postData, authorId);
        }
        catch (error) {
            return next(error);
        }
        res.send(newPost);
    }
    static async edit(req, res, next) {
        const id = req.params.postId;
        if (!id)
            return next(apiError_1.default.badRequest("Post ID was not provided"));
        const data = req.body;
        const updatedData = Object.assign({}, data);
        if (req.file)
            updatedData.imagePath = req.file.path;
        let postEditResponse;
        try {
            postEditResponse = await postsService_1.default.edit(Object.assign({ id }, data));
        }
        catch (error) {
            return next(error);
        }
        res.send(postEditResponse);
    }
    static async delete(req, res, next) {
        const id = req.params.postId;
        if (!id)
            return next(apiError_1.default.badRequest("Post ID was not provided"));
        const { authorId } = req.body;
        let postDeleteResponse;
        try {
            postDeleteResponse = await postsService_1.default.delete({ id, authorId });
        }
        catch (error) {
            return next(error);
        }
        res.send(postDeleteResponse);
    }
}
exports.default = PostsController;
