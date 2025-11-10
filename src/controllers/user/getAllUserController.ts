import type { Request, Response, NextFunction } from "express";
import getAllUserService from "../../services/user/getAllUserService.js";

const getAlluserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const getAllUser = await getAllUserService();
    return res.status(200).json(getAllUser);
  } catch (error) {
    next(error);
  }
};

export default getAlluserController;
