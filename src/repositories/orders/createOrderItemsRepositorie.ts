import type { IOrderItems } from "../../interfaces/order.js";
import prisma from "../../prismaClient/prismaClient.js";
import { Prisma } from "@prisma/client";

const createOrderItemsRepositorie = async (
  orderItems: IOrderItems[]
): Promise<Prisma.BatchPayload> => {
  try {
    const createOrderItems = await prisma.orderItem.createMany({
      data: orderItems,
    });
    return createOrderItems;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default createOrderItemsRepositorie;
