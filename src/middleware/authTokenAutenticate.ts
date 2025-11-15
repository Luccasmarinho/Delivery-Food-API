import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { IVerifyToken } from "../interfaces/user.js";

const authTokenAutenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw { status: 401, message: "Unauthorized" };
    const verifyToken = jwt.verify(
      token,
      process.env.SECRET_KEY!
    ) as IVerifyToken;
    req.userId = verifyToken.id;
    next();
  } catch (error: any) {
    const errors: string[] = [
      "jwt malformed",
      "jwt expired",
      "invalid signature",
      "invalid token",
    ];
    if (error instanceof jwt.JsonWebTokenError) {
      errors.forEach((e) => {
        if (error.message === e) throw { status: 401, message: "Unauthorized" };
      });
    }
    next(error);
  }
};

export default authTokenAutenticate;
