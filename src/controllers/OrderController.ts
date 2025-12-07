import type { Request, Response, NextFunction } from "express";
import type {
  IOrder,
  IOrderReturn,
  IOrderService,
} from "../interfaces/order.js";

export class OrderController {
  constructor(private orderService: IOrderService) {}

  async createOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IOrderReturn> | void> {
    try {
      const {
        body: { items },
        userId,
      } = req;
      const createOrder = await this.orderService.createOrder(userId, items);
      return res.status(201).json(createOrder);
    } catch (error) {
      next(error);
    }
  }

  async getOrderId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IOrderReturn> | void> {
    try {
      const { id } = req.params;
      const getOrderId = await this.orderService.getOrderId(Number(id));
      return res.status(200).json(getOrderId);
    } catch (error) {
      next(error);
    }
  }

  async updateStatusOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IOrder | void> | void> {
    try {
      const {
        params: { id },
        body: { status: newStatus },
      } = req;
      const updateStatusOrder = await this.orderService.updateStatusOrder(
        Number(id),
        newStatus
      );
      return res.status(200).json(updateStatusOrder);
    } catch (error) {
      next(error);
    }
  }
}
