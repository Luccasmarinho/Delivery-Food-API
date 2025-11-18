import type { Request, Response, NextFunction } from "express";
import createOrderService from "../../services/orders/createOrderService.js";
import type { IOrderService } from "../../interfaces/order.js";

const createOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IOrderService> | void> => {
  try {
    const {
      body: { items },
      userId,
    } = req;
    const createOrder = await createOrderService(userId, items);
    return res.status(201).json(createOrder);
  } catch (error) {
    next(error);
  }
};

export default createOrderController;
