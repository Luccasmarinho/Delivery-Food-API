import type { IProducts } from "../interfaces/products.js";
import prisma from "../prismaClient/prismaClient.js";

export interface IProductRepository {
  getAllProducts(): Promise<IProducts[]>;
  createProducts(products: IProducts): Promise<IProducts>;
}

export class ProductRepository implements IProductRepository {
  async getAllProducts(): Promise<IProducts[]> {
    try {
      const getAllProducts = await prisma.product.findMany();
      return getAllProducts;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async createProducts(products: IProducts): Promise<IProducts> {
    try {
      const createProducts = await prisma.product.create({
        data: products,
      });
      return createProducts;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
