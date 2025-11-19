import type { Request, Response, NextFunction } from "express";
import updateStatusOrderService from "../../services/orders/updateStatusOrderService.js";
import type { IOrder } from "../../interfaces/order.js";

const updateStatusOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IOrder | void> | void> => {
  try {
    const {
      params: { id },
      body: { status: newStatus },
    } = req;
    const updateStatusOrder = await updateStatusOrderService(Number(id), newStatus);
    return res.status(200).json(updateStatusOrder);
  } catch (error) {
    next(error);
  }
};

export default updateStatusOrderController;
