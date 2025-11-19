import type { IUserOrderId } from "../../interfaces/user.js";
import prisma from "../../prismaClient/prismaClient.js";

const getUserOrderIdRepositorie = async (userId: number):Promise<IUserOrderId[]> => {
  try {
    const getUserOrderId = await prisma.order.findMany({
      where: { userId },
      select: {
        id: true,
        total: true,
        status: true,
        createdAt: true,

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
    return getUserOrderId;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getUserOrderIdRepositorie;
