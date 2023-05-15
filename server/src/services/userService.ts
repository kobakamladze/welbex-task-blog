import bcryptjs from "bcryptjs";
import { PrismaClient, User } from "@prisma/client";

import ApiError from "../error/apiError";

export default class UserService {
  private static prisma = new PrismaClient();

  public static async login({ email, password }: Omit<User, "id" | "name">) {
    const targetUser = await this.prisma.user.findUnique({ where: { email } });

    if (!targetUser) throw ApiError.badRequest("Such user does not exists!");

    const passwordVerification = await bcryptjs.compare(
      password,
      targetUser.password
    );
    if (!passwordVerification)
      throw ApiError.unauthorized("Invalid email or password");

    return targetUser;
  }

  public static async register({ name, email, password }: User) {
    const hashedPassword = await bcryptjs.hash(password, 10);

    const isEmailTaken: number = await this.prisma.user.count({
      where: { email },
    });

    if (isEmailTaken) throw ApiError.badRequest("Email is taken");

    try {
      const user = await this.prisma.user.create({
        data: { name, email, password: hashedPassword },
      });

      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw ApiError.internalServerError(error.message);
      } else if (error === "string") {
        throw ApiError.internalServerError(error);
      }
    }
  }

  public static async delete({
    email,
    password,
  }: Pick<User, "email" | "password">) {
    const targetUser = await this.prisma.user.findUnique({ where: { email } });

    if (!targetUser) throw ApiError.badRequest("Such user does not exists!");

    const passwordVerification = await bcryptjs.compare(
      password,
      targetUser.password
    );
    if (passwordVerification)
      try {
        const user = await this.prisma.user.delete({
          where: { email },
        });

        return user;
      } catch (error) {
        if (error instanceof Error) {
          throw ApiError.internalServerError(error.message);
        } else if (error === "string") {
          throw ApiError.internalServerError(error);
        }
      }
  }
}
