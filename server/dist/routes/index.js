"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./userRoute"));
const postsRoutes_1 = __importDefault(require("./postsRoutes"));
const router = express_1.default.Router();
router.use("/user", userRoute_1.default);
router.use("/post", postsRoutes_1.default);
exports.default = router;
