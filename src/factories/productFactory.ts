import { ProductController } from "../controllers/ProductController.js";
import type { IProductFactory } from "../interfaces/products.js";
import { ProductRepository } from "../repositories/ProductRepository.js";
import { ProductService } from "../services/ProductService.js";

const productFactory = (): IProductFactory => {
  const productRepository = new ProductRepository();
  const productService = new ProductService(productRepository);
  const productController = new ProductController(productService);
  return {productController, productRepository};
};

export default productFactory