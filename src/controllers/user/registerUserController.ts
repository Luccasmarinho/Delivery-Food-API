import type { NextFunction, Request, Response } from "express";
import registerUserService from "../../services/user/registerUserService.js";

const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const {confirm_password, ...body} = req.body
    const registerUser = await registerUserService(body);
    return res.status(201).json(registerUser);
  } catch (error) {
    return next(error);
  }
};

export default registerUserController;
