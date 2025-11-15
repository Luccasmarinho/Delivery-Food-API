import type { Request, Response, NextFunction } from "express";
import resetPasswordService from "../../services/user/resetPasswordService.js";

const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<string> | void> => {
  try {
    const {
      params: { token },
      body: { password },
    } = req;
    await resetPasswordService(token!, password);
    return res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    next(error);
  }
};

export default resetPasswordController;
