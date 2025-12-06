import type { Request, Response, NextFunction } from "express";
import type { IUser } from "../interfaces/user.js";
import { UserRepository } from "../repositories/UserRepository.js";
const userRepository = new UserRepository();

const userAuthorizathion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getUserId = (await userRepository.getUserId(req.userId)) as IUser;
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
