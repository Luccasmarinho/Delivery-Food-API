import type { Request, Response, NextFunction } from "express";
import createProductsService from "../../services/products/createProductsService.js";
import type { IProducts } from "../../interfaces/products.js";

const createProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IProducts> | void> => {
  try {
    const createProducts = await createProductsService(req.body);
    return res.status(201).json(createProducts);
  } catch (error: any) {
    next(error);
  }
};

export default createProductsController;
