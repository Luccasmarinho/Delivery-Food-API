import Express from "express";
const productsRoutes = Express.Router();

import authTokenAutenticate from "../../middleware/authTokenAutenticate.js";
import createProductsController from "../../controllers/products/createProductsController.js";
import validateBody from "../../middleware/validateBody.js";
import schemaProducts from "../../schemas/schemaProducts.js";

productsRoutes.post(
  "/products",
  authTokenAutenticate,
  validateBody(schemaProducts.products),
  createProductsController
);

export default productsRoutes;
