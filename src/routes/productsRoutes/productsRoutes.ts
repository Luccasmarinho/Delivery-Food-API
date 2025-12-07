import Express from "express";
const productsRoutes = Express.Router();

import productFactory from "../../factories/productFactory.js";
import schemaProducts from "../../schemas/schemaProducts.js";

import validateBody from "../../middleware/validateBody.js";
import userAuthorizathion from "../../middleware/userAuthorization.js";
import authTokenAutenticate from "../../middleware/authTokenAutenticate.js";

productsRoutes.post(
  "/products",
  authTokenAutenticate,
  userAuthorizathion,
  validateBody(schemaProducts.products),
  (req, res, next) =>
    productFactory().productController.createProduct(req, res, next)
);

productsRoutes.get("/products", authTokenAutenticate, (req, res, next) =>
  productFactory().productController.getAllProduct(req, res, next)
);

export default productsRoutes;
