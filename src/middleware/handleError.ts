import type { Request, Response, NextFunction } from "express";
interface IError {
  statusCodeError: number;
  message: string;
}

const handleError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  const status = err.status || 500;
  const message = err.message || "Internal server error.";
  const ReturnError: IError = {
    statusCodeError: status,
    message: message,
  };
  return res.status(status).json(ReturnError);
};

export default handleError;
