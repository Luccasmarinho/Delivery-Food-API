import type {
  IItens,
  IOrder,
  IOrderRepository,
  IOrderReturn,
  IOrderService,
  Status,
} from "../interfaces/order.js";
import type { IProductRepository } from "../interfaces/products.js";
import {
  invalidOrderIdValidator,
  orderIdDoesnotExistsValidator,
} from "../validators/orderBusinessValidator.js";

export class OrderService implements IOrderService {
  constructor(
    private orderRepository: IOrderRepository,
    private productRepository: IProductRepository
  ) {}

  async createOrder(userId: number, items: IItens[]): Promise<IOrderReturn> {
    const getProductId = await this.productRepository.getProductId(items);

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
    const createOrder = await this.orderRepository.createOrder(order);
    const orderItems = items.map((e) => ({
      ...e,
      orderId: createOrder.id!,
    }));
    await this.orderRepository.createOrderItems(orderItems);

    const itemsReturn = items
      .map((e, i) => ({
        ...e,
        product: product[i]!,
      }))
      .sort((a, b) => a.productId - b.productId);

    return { ...createOrder, items: itemsReturn };
  }

  async getOrderId(id: number): Promise<IOrderReturn> {
    invalidOrderIdValidator(id);
    const getOrderId = await orderIdDoesnotExistsValidator(id);
    return getOrderId;
  }

  async updateStatusOrder(
    id: number,
    newStatus: Status
  ): Promise<IOrder | void> {
    invalidOrderIdValidator(id);
    await orderIdDoesnotExistsValidator(id);

    const updateStatusOrder = await this.orderRepository.updateStatusOrder(
      id,
      newStatus
    );
    return updateStatusOrder;
  }
}
