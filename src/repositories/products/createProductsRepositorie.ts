import type { IProducts } from "../../interfaces/products.js";
import prisma from "../../prismaClient/prismaClient.js";

const createProductsRepositorie = async (
  products: IProducts
): Promise<IProducts> => {
  try {
    const createProducts = await prisma.product.create({
      data: products,
    });
    return createProducts;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default createProductsRepositorie;
