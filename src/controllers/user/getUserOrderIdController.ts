import type { Request, Response, NextFunction } from "express";
import getUserOrderIdService from "../../services/user/getUserOrderIdService.js";
import type { IUserOrderId } from "../../interfaces/user.js";

const getUserOrderIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IUserOrderId[]> | void> => {
  try {
    const { userId } = req.params;
    const getUserOrder = await getUserOrderIdService(Number(userId));
    return res.status(200).json(getUserOrder);
  } catch (error) {
    next(error);
  }
};

export default getUserOrderIdController;
