import Express from "express";
import createOrderController from "../../controllers/order/createOrderController.js";
import authTokenAutenticate from "../../middleware/authTokenAutenticate.js";
const orderRoutes = Express.Router();

orderRoutes.post("/orders",authTokenAutenticate, createOrderController);

export default orderRoutes;
