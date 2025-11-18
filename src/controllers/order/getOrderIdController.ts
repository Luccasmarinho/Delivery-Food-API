import type { Request, Response, NextFunction } from "express";
import getOrderIdRepositorie from "../../repositories/orders/getOrderIdRepositorie.js";

const getOrderIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id} = req.params
    const getOrderId = await getOrderIdRepositorie(Number(id));
    return res.status(200).json(getOrderId);
  } catch (error) {
    next(error)
  }
};

export default getOrderIdController;
