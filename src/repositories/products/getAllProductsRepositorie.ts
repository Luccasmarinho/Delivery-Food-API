import type { IProducts } from "../../interfaces/products.js";
import prisma from "../../prismaClient/prismaClient.js";

const getAllProductsRepositorie = async (): Promise<IProducts[]> => {
  try {
    const getAllProducts = await prisma.product.findMany();
    return getAllProducts;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getAllProductsRepositorie;
