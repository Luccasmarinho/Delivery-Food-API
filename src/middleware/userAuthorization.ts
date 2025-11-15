import type { Request, Response, NextFunction } from "express";
import getUserIdRepositorie from "../repositories/user/getUserIdRepositorie.js";
import type { IUser } from "../interfaces/user.js";

const userAuthorizathion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getUserId = (await getUserIdRepositorie(req.userId)) as IUser;
    if (getUserId.role === "CLIENT")
      throw {
        status: 403,
        message:
          "Access denied. You do not have permission to access this resource.",
      };
    next();
  } catch (error: any) {
    next(error);
  }
};

export default userAuthorizathion;
