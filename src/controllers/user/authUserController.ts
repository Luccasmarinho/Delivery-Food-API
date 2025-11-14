import type { Request, Response, NextFunction } from "express";
import authUserService from "../../services/user/authUserService.js";

const authUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { acessToken, refreshToken } = await authUserService(email, password);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, //em prod mudar para true
      path: "/auth",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return res.status(200).json({ message: acessToken });
  } catch (error) {
    next(error);
  }
};

export default authUserController;
