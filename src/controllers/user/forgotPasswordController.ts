import type { Request, Response, NextFunction } from "express";
import forgotPasswordMail from "../../services/user/mail/forgotPasswordMail.js";

const forgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<string> | void> => {
  try {
    const { email } = req.body;
    await forgotPasswordMail(email);
    return res.status(200).json({
      message:
        "An email with information on how to recover your password has been sent.",
    });
  } catch (error) {
    next(error);
  }
};

export default forgotPasswordController;
