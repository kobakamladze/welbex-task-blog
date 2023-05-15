"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = __importDefault(require("../error/apiError"));
function default_1(req, res, next) {
    var _a;
    try {
        const authorization = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        let token;
        if (authorization)
            token = authorization.split(" ")[1];
        if (!token)
            throw apiError_1.default.unauthorized("Not aurthorized");
        next();
    }
    catch (e) {
        console.log(e);
        next(apiError_1.default.unauthorized("Not authorized"));
    }
}
exports.default = default_1;
