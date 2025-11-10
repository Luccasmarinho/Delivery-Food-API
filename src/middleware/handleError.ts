import type { Request, Response, NextFunction } from "express";
import type { IError } from "../interfaces/common.js";

const handleError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response<IError> => {
  const status: number = err.status || 500;
  const message: string = err.message || "Internal server error.";
  const returnError: IError = {
    statusCode: status,
    message,
  };
  return res.status(status).json(returnError);
};

export default handleError;
