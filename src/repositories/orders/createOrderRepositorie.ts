import type { IOrder } from "../../interfaces/order.js";
import prisma from "../../prismaClient/prismaClient.js";

const createOrderRepositorie = async (order: IOrder): Promise<IOrder> => {
    try {
        const createOrder = await prisma.order.create({
            data: order
        })
        return createOrder
    } catch (error: any) {
    throw new Error(error.message);
        
    }
}

export default createOrderRepositorie