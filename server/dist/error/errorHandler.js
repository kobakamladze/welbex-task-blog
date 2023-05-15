"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = __importDefault(require("./apiError"));
function errorHandler(err, req, res, next) {
    if (err instanceof apiError_1.default) {
        return res.status(err.status).json({ message: err.message });
    }
    console.log(err);
    return res.status(500).json({ message: "Unhandled error..." });
}
exports.default = errorHandler;
