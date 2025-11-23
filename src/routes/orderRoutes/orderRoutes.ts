import Express from "express";

import validateBody from "../../middleware/validateBody.js";
import authTokenAutenticate from "../../middleware/authTokenAutenticate.js";
import userAuthorizathion from "../../middleware/userAuthorization.js";

import createOrderController from "../../controllers/order/createOrderController.js";
import getOrderIdController from "../../controllers/order/getOrderIdController.js";

import schemaOrder from "../../schemas/schemaOrder.js";
import updateStatusOrderController from "../../controllers/order/updateStatusOrderController.js";

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
  // userAuthorizathion,
  getOrderIdController
);

orderRoutes.patch(
  "/orders/:id/status",
  authTokenAutenticate,
  userAuthorizathion,
  validateBody(schemaOrder.updateStatus),
  updateStatusOrderController
);

export default orderRoutes;
