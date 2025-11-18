import type { IOrderReturn } from "../../interfaces/order.js";
import getOrderIdRepositorie from "../../repositories/orders/getOrderIdRepositorie.js";

const getOrderIdService = async (id: number): Promise<IOrderReturn> => {
  if (isNaN(id))
    throw { status: 400, message: "Invalid order ID. Expected a number" };
  const getOrderId = await getOrderIdRepositorie(id);
  if (!getOrderId) throw { status: 404, message: "Order not found." };

  return getOrderId;
};

export default getOrderIdService;
