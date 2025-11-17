import Express from "express";
const productsRoutes = Express.Router();

import schemaProducts from "../../schemas/schemaProducts.js";

import createProductsController from "../../controllers/products/createProductsController.js";

import getAllProductsController from "../../controllers/products/getAllProductsController.js";

import validateBody from "../../middleware/validateBody.js";
import userAuthorizathion from "../../middleware/userAuthorization.js";
import authTokenAutenticate from "../../middleware/authTokenAutenticate.js";

productsRoutes.post(
  "/products",
  authTokenAutenticate,
  userAuthorizathion,
  validateBody(schemaProducts.products),
  createProductsController
);

productsRoutes.get("/products", authTokenAutenticate, getAllProductsController);

export default productsRoutes;
