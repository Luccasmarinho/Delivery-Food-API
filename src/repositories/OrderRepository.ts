import type { Prisma } from "@prisma/client";
import type {
  IOrder,
  IOrderItems,
  IOrderRepository,
  IOrderReturn,
  Status,
} from "../interfaces/order.js";
import prisma from "../prismaClient/prismaClient.js";

export class OrderRepository implements IOrderRepository {
  async createOrderItems(
    orderItems: IOrderItems[]
  ): Promise<Prisma.BatchPayload> {
    try {
      const createOrderItems = await prisma.orderItem.createMany({
        data: orderItems,
      });
      return createOrderItems;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async createOrder(order: IOrder): Promise<IOrder> {
    try {
      const createOrder = await prisma.order.create({
        data: order,
      });
      return createOrder;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getOrderId(id: number): Promise<IOrderReturn | void> {
    try {
      const getOrderId = await prisma.order.findUnique({
        where: { id },
        include: {
          items: {
            select: {
              productId: true,
              quantity: true,

              product: {
                select: {
                  name: true,
                  price: true,
                },
              },
            },
          },
        },
      });
      if (!getOrderId) return;
      return getOrderId;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateStatusOrder(
    id: number,
    newStatus: Status
  ): Promise<IOrder | void> {
    try {
      const updateStatusOrder = await prisma.order.update({
        where: { id },
        data: { status: newStatus },
      });
      return updateStatusOrder;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
