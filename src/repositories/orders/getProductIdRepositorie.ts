import type { IItens } from "../../interfaces/order.js";
import prisma from "../../prismaClient/prismaClient.js";
import type { IProducts } from "../../interfaces/products.js";

const getProductIdRepositorie = async (
  items: IItens[]
): Promise<IProducts[]> => {
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
};

export default getProductIdRepositorie;
