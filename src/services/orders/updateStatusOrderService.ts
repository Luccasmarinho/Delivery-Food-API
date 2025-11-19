import type { IOrder, Status } from "../../interfaces/order.js";
import getOrderIdRepositorie from "../../repositories/orders/getOrderIdRepositorie.js";
import updateStatusOrderRepositorie from "../../repositories/orders/updateStatusOrderRepositorie.js";

const updateStatusOrderService = async (
  id: number,
  newStatus: Status
): Promise<IOrder | void> => {
  if (isNaN(id))
    throw { status: 400, message: "Invalid order ID. Expected a number" };

  const getOrderId = await getOrderIdRepositorie(id);
  if (!getOrderId) throw { status: 404, message: "Order not found." };

   const updateStatusOrder = await updateStatusOrderRepositorie(id, newStatus);
   return updateStatusOrder
};

export default updateStatusOrderService;
