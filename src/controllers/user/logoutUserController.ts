import type { Request, Response, NextFunction } from "express";
import logoutUserService from "../../services/user/logoutUserService.js";

const logoutUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<void> | void> => {
  try {
    await logoutUserService(req.cookies.refreshToken);
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false, //em prod mudar para true
      path: "/auth",
    });
    return res.status(200).json({ Messaage: "Logout successful." });
  } catch (error) {
    next(error);
  }
};

export default logoutUserController;
