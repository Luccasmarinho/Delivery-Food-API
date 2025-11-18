import type { Decimal } from "@prisma/client/runtime/library";

export type Status = "PENDING" | "ACCEPTED" | "REJECTED" | "DELIVERED";

export interface IItens {
  productId: number;
  quantity: number;
}

export interface IOrder {
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
};

export interface IOrderService {
  userId: number;
  total: number;
  status?: Status;
  createdAt?: Date;
  items: IItemReturn[];
}