import type { IProducts } from "../../interfaces/products.js";
import createProductsRepositorie from "../../repositories/products/createProductsRepositorie.js";

const createProductsService = async (
  products: IProducts
): Promise<IProducts> => {
  const createProducts = await createProductsRepositorie(products);
  return createProducts;
};

export default createProductsService;
