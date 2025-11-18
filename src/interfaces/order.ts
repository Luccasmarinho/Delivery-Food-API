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