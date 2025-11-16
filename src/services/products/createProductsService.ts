import type { IProducts } from "../../interfaces/products.js";
import createProductsRepositorie from "../../repositories/products/createProductsRepositorie.js";

const createProductsService = async (
  products: IProducts
): Promise<IProducts> => {
  const createProducts = await createProductsRepositorie(products);
  const returnCreateProducts = {
    ...createProducts,
    price: Number(createProducts.price).toFixed(2),
  };
  return returnCreateProducts;
};

export default createProductsService;
