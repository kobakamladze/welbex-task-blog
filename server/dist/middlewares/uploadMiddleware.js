"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            // console.log(req);
            cb(null, "uploads/");
        },
        filename: function (req, file, cb) {
            // console.log(req);
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    }),
    fileFilter: function (req, file, cb) {
        // console.log(req);
        if (file.mimetype === "image/png" ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/jpg") {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    },
});
exports.default = upload;
