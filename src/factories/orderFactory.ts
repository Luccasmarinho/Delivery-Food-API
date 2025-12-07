import { OrderController } from "../controllers/OrderController.js";
import { OrderRepository } from "../repositories/OrderRepository.js";
import { OrderService } from "../services/OrderService.js";
import productFactory from "../factories/productFactory.js";

const orderFactory = (): OrderController => {
  const orderRepository = new OrderRepository();
  const orderService = new OrderService(
    orderRepository,
    productFactory().productRepository
  );
  const orderController = new OrderController(orderService);
  return orderController;
};

export default orderFactory;
