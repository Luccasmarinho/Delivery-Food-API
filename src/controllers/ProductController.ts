import type { Request, Response, NextFunction } from "express";
import type { IProducts } from "../interfaces/products.js";
import type { IProductService } from "../services/ProductService.js";

export class ProductController {
  constructor(private productService: IProductService) {}

  async createProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IProducts> | void> {
    try {
      const createProducts = await this.productService.createProduct(req.body);
      return res.status(201).json(createProducts);
    } catch (error: any) {
      next(error);
    }
  }

  async getAllProduct(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IProducts[]> | void> {
    try {
      const getAllProducts = await this.productService.getAllProduct();
      return res.status(200).json(getAllProducts);
    } catch (error) {
      next(error);
    }
  }
}
