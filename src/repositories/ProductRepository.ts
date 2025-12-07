import type { IItens } from "../interfaces/order.js";
import type { IProductRepository, IProducts } from "../interfaces/products.js";
import prisma from "../prismaClient/prismaClient.js";

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

  async getProductId(items: IItens[]): Promise<IProducts[]> {
    const ids = items.map((e) => e.productId);
    try {
      const getProductId = await prisma.product.findMany({
        where: {
          id: { in: ids },
        },
      });
      const ordered = ids
        .map((id) => getProductId.find((p) => p.id === id))
        .filter((p) => p !== undefined);
      return ordered;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
