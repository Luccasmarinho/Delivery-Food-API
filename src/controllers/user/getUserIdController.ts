import type { Request, Response, NextFunction } from "express";
import getUserIdService from "../../services/user/getUserIdService.js";
import type { IUser } from "../../interfaces/user.js";

const getUserIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IUser> | void> => {
  try {
    const { id } = req.params;
    const getUserId = await getUserIdService(Number(id));
    return res.status(200).json(getUserId)
  } catch (error) {
    return next(error);
  }
};

export default getUserIdController;
