import { NextFunction, Request, Response } from "express";
import ApiError from "../error/apiError";

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const authorization: string | undefined = req.headers?.authorization;

    let token;
    if (authorization) token = authorization.split(" ")[1];
    if (!token) throw ApiError.unauthorized("Not aurthorized");

    next();
  } catch (e) {
    console.log(e);
    next(ApiError.unauthorized("Not authorized"));
  }
}
