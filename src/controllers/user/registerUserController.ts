import type { NextFunction, Request, Response } from "express";
import registerUserService from "../../services/user/registerUserService.js";

const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const registerUser = await registerUserService(req.body);
    return res.status(201).json(registerUser);
  } catch (error) {
    return next(error);
  }
};

export default registerUserController;
