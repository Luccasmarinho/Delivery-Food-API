import type { Request, Response } from "express";

const registerUser = (req: Request, res: Response) => {
  return res.status(200).json({ Message: "teste" });
};

export default registerUser;
