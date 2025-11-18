import type { IItens, IOrderService } from "../../interfaces/order.js";
import createOrderItemsRepositorie from "../../repositories/orders/createOrderItemsRepositorie.js";
import createOrderRepositorie from "../../repositories/orders/createOrderRepositorie.js";
import getProductIdRepositorie from "../../repositories/orders/getProductIdRepositorie.js";

const createOrderService = async (
  userId: number,
  items: IItens[]
): Promise<IOrderService> => {
  const getProductId = await getProductIdRepositorie(items);

  if (getProductId.length === 0)
    throw { status: 404, message: "No orders found." };

  const price = getProductId.map((e) => Number(e?.price));
  //   const product = Object.fromEntries(
  //     getProductId.map((e) => [e.name, e.price])
  //   );
  const product = getProductId.map((e) => ({
    name: e?.name,
    price: e?.price,
  }));

  const priceTotal = items
    .map((e, i) => {
      const p = price[i];
      if (!p) return 0;
      return e.quantity * p;
    })
    .reduce((a, b) => a + b, 0)
    .toFixed(2);

  const order = {
    userId,
    total: Number(priceTotal),
  };
  const createOrder = await createOrderRepositorie(order);
  const orderItems = items.map((e) => ({
    ...e,
    orderId: createOrder.id!,
  }));
  await createOrderItemsRepositorie(orderItems);

  const itemsReturn = items
    .map((e, i) => ({
      ...e,
      product: product[i]!,
    }))
    .sort((a, b) => a.productId - b.productId);

  return { ...createOrder, items: itemsReturn };
};

export default createOrderService;
