import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import router from "./routes/index";
import errorHandler from "./error/errorHandler";

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.method, req.url);
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ exposedHeaders: "*" }));

app.use("/uploads", express.static("uploads"));
app.use("/api", router);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}....`);
});
