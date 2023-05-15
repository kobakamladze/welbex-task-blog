"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class TokenService {
    static generateToken(payload) {
        return {
            accessToken: jsonwebtoken_1.default.sign(payload, `${process.env.TOKEN_SECRET}`),
        };
    }
    static validateToken(token) {
        return jsonwebtoken_1.default.decode(token);
    }
}
exports.default = TokenService;
