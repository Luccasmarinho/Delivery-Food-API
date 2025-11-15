import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authTokenAutenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) throw { status: 401, message: "Unauthorized" };

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY!);
    //  req.user = verifyToken.id
    next();
  } catch (error: any) {
    if (error instanceof jwt.JsonWebTokenError) {
      if (error.message == "jwt malformed" || error.message == "jwt expired") {
        throw { status: 401, message: "Unauthorized" };
      }
    }
    next(error);
  }
};

export default authTokenAutenticate;
