import type { Prisma } from "@prisma/client";
import type { Decimal } from "@prisma/client/runtime/library";

export type Status = "PENDING" | "ACCEPTED" | "REJECTED" | "DELIVERED";

export interface IItens {
  productId: number;
  quantity: number;
}

export interface IOrderItems extends IItens {
  orderId: number;
}
[];

export interface IOrder {
  id?: number;
  userId: number;
  total: number;
  status?: Status;
  createdAt?: Date;
}

export interface IItemReturn {
  productId: number;
  quantity: number;
  product: {
    name: string;
    price: Decimal;
  };
}

export interface IOrderReturn {
  userId: number;
  total: number;
  status?: Status;
  createdAt?: Date;
  items: IItemReturn[];
}

export interface IOrderRepository {
  createOrderItems(orderItems: IOrderItems[]): Promise<Prisma.BatchPayload>;
  createOrder(order: IOrder): Promise<IOrder>;
  getOrderId(id: number): Promise<IOrderReturn | void>;
  updateStatusOrder(id: number, newStatus: Status): Promise<IOrder | void>;
}

export interface IOrderService {
  createOrder(userId: number, items: IItens[]): Promise<IOrderReturn>;
  getOrderId(id: number): Promise<IOrderReturn>;
  updateStatusOrder(id: number, newStatus: Status): Promise<IOrder | void>;
}