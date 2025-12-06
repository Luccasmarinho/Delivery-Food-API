import { UserController } from "../controllers/UserControllers.js";
import { UserRepository } from "../repositories/UserRepository.js"
import { UserServices } from "../services/UserServices.js";

const userFactory = (): UserController => {
    const userRepository = new UserRepository();
    const userService  = new UserServices(userRepository);
    const userController = new UserController(userService);
    return userController
}

export default userFactory
