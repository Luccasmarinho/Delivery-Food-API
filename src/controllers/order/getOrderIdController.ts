import type { Request, Response, NextFunction } from "express";
import getOrderIdService from "../../services/orders/getOrderIdService.js";

const getOrderIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id} = req.params
    const getOrderId = await getOrderIdService(Number(id));
    return res.status(200).json(getOrderId);
  } catch (error) {
    next(error)
  }
};

export default getOrderIdController;
