import crypto from "crypto";
import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";

import UserService from "../services/userService";
import TokenService from "../services/tokenService";
import ApiError from "../error/apiError";

class userController {
  public static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { name, email, password }: User = req.body;
    const id: string = crypto.randomUUID();

    let newUser;
    try {
      newUser = await UserService.register({ id, email, name, password });
    } catch (error) {
      return next(error);
    }

    const { accessToken } = TokenService.generateToken({ id, email, name });
    res.setHeader("authorization", accessToken);

    res.send(newUser);
  }

  public static async login(req: Request, res: Response, next: NextFunction) {
    const { id, name, email, password } = req.body;

    let user;
    try {
      user = await UserService.login({ email, password });
    } catch (error) {
      return next(error);
    }
    const { accessToken } = TokenService.generateToken({ id, email, name });
    res.setHeader("authorization", accessToken);

    res.send(user);
  }

  public static async delete(req: Request, res: Response, next: NextFunction) {
    const email: string | undefined = req.body?.email;
    const password: string | undefined = req.body?.password;

    if (!email || !password)
      return next(ApiError.forbidden("Incorrect credentials"));

    const deleteAction = await UserService.delete({ email, password });
    res.send({ message: "User deleted" });
  }
}

export default userController;
