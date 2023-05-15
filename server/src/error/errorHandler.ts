import { NextFunction, Request, Response } from "express";
import ApiError from "./apiError";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }

  console.log(err);
  return res.status(500).json({ message: "Unhandled error..." });
}
