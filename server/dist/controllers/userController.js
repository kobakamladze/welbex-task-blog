"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const userService_1 = __importDefault(require("../services/userService"));
const tokenService_1 = __importDefault(require("../services/tokenService"));
const apiError_1 = __importDefault(require("../error/apiError"));
class userController {
    static async register(req, res, next) {
        const { name, email, password } = req.body;
        const id = crypto_1.default.randomUUID();
        let newUser;
        try {
            newUser = await userService_1.default.register({ id, email, name, password });
        }
        catch (error) {
            return next(error);
        }
        const { accessToken } = tokenService_1.default.generateToken({ id, email, name });
        res.setHeader("authorization", accessToken);
        res.send(newUser);
    }
    static async login(req, res, next) {
        const { id, name, email, password } = req.body;
        let user;
        try {
            user = await userService_1.default.login({ email, password });
        }
        catch (error) {
            return next(error);
        }
        const { accessToken } = tokenService_1.default.generateToken({ id, email, name });
        res.setHeader("authorization", accessToken);
        res.send(user);
    }
    static async delete(req, res, next) {
        var _a, _b;
        const email = (_a = req.body) === null || _a === void 0 ? void 0 : _a.email;
        const password = (_b = req.body) === null || _b === void 0 ? void 0 : _b.password;
        if (!email || !password)
            return next(apiError_1.default.forbidden("Incorrect credentials"));
        const deleteAction = await userService_1.default.delete({ email, password });
        res.send({ message: "User deleted" });
    }
}
exports.default = userController;
