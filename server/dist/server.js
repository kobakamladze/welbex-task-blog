"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const errorHandler_1 = __importDefault(require("./error/errorHandler"));
const app = (0, express_1.default)();
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({ exposedHeaders: "*" }));
app.use("/uploads", express_1.default.static("uploads"));
app.use("/api", index_1.default);
app.use(errorHandler_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}....`);
});
