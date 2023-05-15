import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

import { User } from "@prisma/client";

export default class TokenService {
  public static generateToken(payload: Omit<User, "password">) {
    return {
      accessToken: jwt.sign(payload, `${process.env.TOKEN_SECRET}`),
    };
  }

  public static validateToken(token: string) {
    return jwt.decode(token);
  }
}
