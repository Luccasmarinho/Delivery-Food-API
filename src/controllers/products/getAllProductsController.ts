import type { Request, Response, NextFunction } from "express";
import getAllProductsRepositorie from "../../repositories/products/getAllProductsRepositorie.js";
import type { IProducts } from "../../interfaces/products.js";

const getAllProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IProducts[]> | void> => {
  try {
    const getAllProducts = await getAllProductsRepositorie();
    return res.status(200).json(getAllProducts);
  } catch (error) {
    next(error);
  }
};

export default getAllProductsController;
