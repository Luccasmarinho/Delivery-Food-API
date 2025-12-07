import type { IOrderReturn } from "../interfaces/order.js";
import { OrderRepository } from "../repositories/OrderRepository.js";

const orderRepository = new OrderRepository();

export const invalidOrderIdValidator = (id: number): void => {
  if (isNaN(id) || typeof id !== "number")
    throw { status: 400, message: "Invalid order ID. Expected a number" };
};

export const orderIdDoesnotExistsValidator = async (
  id: number
): Promise<IOrderReturn> => {
  const getOrderId = await orderRepository.getOrderId(id);
  if (!getOrderId) throw { status: 404, message: "Order not found." };
  return getOrderId;
};
