import type { IProducts } from "../../interfaces/products.js";
import getAllProductsRepositorie from "../../repositories/products/getAllProductsRepositorie.js"

const getAllProductsService = async (): Promise<IProducts[]> => {
    const getAllProducts = await getAllProductsRepositorie();
    return getAllProducts
}

export default getAllProductsService