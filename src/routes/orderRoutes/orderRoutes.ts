import Express from "express";
const orderRoutes = Express.Router();

import schemaOrder from "../../schemas/schemaOrder.js";
import orderFactory from "../../factories/orderFactory.js";

import validateBody from "../../middleware/validateBody.js";
import authTokenAutenticate from "../../middleware/authTokenAutenticate.js";
import userAuthorizathion from "../../middleware/userAuthorization.js";

orderRoutes.post(
  "/orders",
  authTokenAutenticate,
  validateBody(schemaOrder.createOrder),
  (req, res, next) => orderFactory().createOrder(req, res, next)
);

orderRoutes.get(
  "/orders/:id",
  authTokenAutenticate,
  // userAuthorizathion,
  (req, res, next) => orderFactory().getOrderId(req, res, next)
);

orderRoutes.patch(
  "/orders/:id/status",
  authTokenAutenticate,
  userAuthorizathion,
  validateBody(schemaOrder.updateStatus),
  (req, res, next) => orderFactory().updateStatusOrder(req, res, next)
);

export default orderRoutes;
