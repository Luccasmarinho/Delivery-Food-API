import { UserController } from "../controllers/UserControllers.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { UserService } from "../services/UserService.js";

const userFactory = (): UserController => {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);
  return userController;
};

export default userFactory;
