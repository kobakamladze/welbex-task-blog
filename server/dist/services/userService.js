"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const apiError_1 = __importDefault(require("../error/apiError"));
class UserService {
    static async login({ email, password }) {
        const targetUser = await this.prisma.user.findUnique({ where: { email } });
        if (!targetUser)
            throw apiError_1.default.badRequest("Such user does not exists!");
        const passwordVerification = await bcryptjs_1.default.compare(password, targetUser.password);
        if (!passwordVerification)
            throw apiError_1.default.unauthorized("Invalid email or password");
        return targetUser;
    }
    static async register({ name, email, password }) {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const isEmailTaken = await this.prisma.user.count({
            where: { email },
        });
        if (isEmailTaken)
            throw apiError_1.default.badRequest("Email is taken");
        try {
            const user = await this.prisma.user.create({
                data: { name, email, password: hashedPassword },
            });
            return user;
        }
        catch (error) {
            if (error instanceof Error) {
                throw apiError_1.default.internalServerError(error.message);
            }
            else if (error === "string") {
                throw apiError_1.default.internalServerError(error);
            }
        }
    }
    static async delete({ email, password, }) {
        const targetUser = await this.prisma.user.findUnique({ where: { email } });
        if (!targetUser)
            throw apiError_1.default.badRequest("Such user does not exists!");
        const passwordVerification = await bcryptjs_1.default.compare(password, targetUser.password);
        if (passwordVerification)
            try {
                const user = await this.prisma.user.delete({
                    where: { email },
                });
                return user;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw apiError_1.default.internalServerError(error.message);
                }
                else if (error === "string") {
                    throw apiError_1.default.internalServerError(error);
                }
            }
    }
}
UserService.prisma = new client_1.PrismaClient();
exports.default = UserService;
