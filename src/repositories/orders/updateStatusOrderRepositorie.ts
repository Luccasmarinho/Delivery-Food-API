import type { IOrder, Status } from "../../interfaces/order.js";
import prisma from "../../prismaClient/prismaClient.js";

const updateStatusOrderRepositorie = async (
  id: number,
  newStatus: Status
): Promise<IOrder | void> => {
  try {
    const updateStatusOrder = await prisma.order.update({
      where: { id },
      data: { status: newStatus },
    });
    return updateStatusOrder;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export default updateStatusOrderRepositorie;
