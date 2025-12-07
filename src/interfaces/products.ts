import { Decimal } from "@prisma/client/runtime/library";
import type { IItens } from "./order.js";

export interface IProducts {
  name: string;
  description?: string | null;
  price: Decimal;
  image_url: string;
  createdAt?: Date;
}

export interface IProductRepository {
  getAllProducts(): Promise<IProducts[]>;
  createProducts(products: IProducts): Promise<IProducts>;
  getProductId(items: IItens[]): Promise<IProducts[]>;
}

export interface IProductFactory {
  productController: any
  productRepository: IProductRepository
}