import Express from "express";

import validateBody from "../../middleware/validateBody.js";
import authTokenAutenticate from "../../middleware/authTokenAutenticate.js";
import userAuthorizathion from "../../middleware/userAuthorization.js";

import createOrderController from "../../controllers/order/createOrderController.js";
import getOrderIdController from "../../controllers/order/getOrderIdController.js";

import schemaOrder from "../../schemas/schemaOrder.js";

const orderRoutes = Express.Router();

orderRoutes.post(
  "/orders",
  authTokenAutenticate,
  validateBody(schemaOrder.createOrder),
  createOrderController
);
orderRoutes.get(
  "/orders/:id",
  authTokenAutenticate,
  userAuthorizathion,
  getOrderIdController
);

export default orderRoutes;
