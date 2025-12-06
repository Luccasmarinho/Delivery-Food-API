import type { IProducts } from "../interfaces/products.js";
import type { IProductRepository } from "../repositories/ProductRepository.js";

export interface IProductService {
  createProduct(products: IProducts): Promise<IProducts>;
  getAllProduct(): Promise<IProducts[]>;
}

export class ProductService {
  constructor(private productRepository: IProductRepository) {}

  async createProduct(products: IProducts): Promise<IProducts> {
    const createProducts = await this.productRepository.createProducts(
      products
    );
    return createProducts;
  }

  async getAllProduct(): Promise<IProducts[]> {
    const getAllProducts = await this.productRepository.getAllProducts();
    return getAllProducts;
  }
}
