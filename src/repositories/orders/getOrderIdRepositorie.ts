import prisma from "../../prismaClient/prismaClient.js";

const getOrderIdRepositorie = async (id: number) => {
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
                price: true
              },
            },
          },
        },
      },
    });
    return getOrderId
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getOrderIdRepositorie;
