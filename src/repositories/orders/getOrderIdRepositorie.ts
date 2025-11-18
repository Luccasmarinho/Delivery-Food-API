import type { IOrderReturn } from "../../interfaces/order.js";
import prisma from "../../prismaClient/prismaClient.js";

const getOrderIdRepositorie = async (
  id: number
): Promise<IOrderReturn | void> => {
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
};

export default getOrderIdRepositorie;
