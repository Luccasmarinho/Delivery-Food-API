import { ProductController } from "../controllers/ProductController.js";
import { ProductRepository } from "../repositories/ProductRepository.js";
import { ProductService } from "../services/ProductService.js";

const productFactory = () => {
  const productRepository = new ProductRepository();
  const productService = new ProductService(productRepository);
  const productController = new ProductController(productService);
  return productController
};

export default productFactory