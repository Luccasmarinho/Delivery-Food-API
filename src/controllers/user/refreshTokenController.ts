import type { Request, Response, NextFunction } from "express";
import refreshTokenService from "../../services/user/refreshTokenService.js";

const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<string> | void> => {
  try {
    const { refreshToken } = req.cookies;
    const newAccessToken = await refreshTokenService(refreshToken);
    return res.status(200).json({ newAccessToken });
  } catch (error) {
    next(error);
  }
};

export default refreshTokenController;
