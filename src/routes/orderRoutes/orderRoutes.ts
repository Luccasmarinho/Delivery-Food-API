import Express from "express";
import createOrderController from "../../controllers/order/createOrderController.js";
import authTokenAutenticate from "../../middleware/authTokenAutenticate.js";
import getOrderIdController from "../../controllers/order/getOrderIdController.js";
import userAuthorizathion from "../../middleware/userAuthorization.js";
const orderRoutes = Express.Router();

orderRoutes.post("/orders", authTokenAutenticate, createOrderController);
orderRoutes.get(
  "/orders/:id",
  authTokenAutenticate,
  userAuthorizathion,
  getOrderIdController
);

export default orderRoutes;
