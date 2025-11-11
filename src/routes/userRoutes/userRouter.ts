import Express from "express";
const userRoutes = Express.Router();

import schemaUser from "../../schemas/schemaUser.js";
import validateBody from "../../middleware/validateBody.js";

import registerUserController from "../../controllers/user/registerUserController.js";

import getAlluserController from "../../controllers/user/getAllUserController.js";
import getUserIdController from "../../controllers/user/getUserIdController.js";
import forgotPasswordController from "../../controllers/user/forgotPasswordController.js";

userRoutes.post(
  "/auth/register",
  validateBody(schemaUser.registerUser),
  registerUserController
);

userRoutes.post(
  "/auth/forgot-password",
  validateBody(schemaUser.forgotPassword),
  forgotPasswordController
);

userRoutes.get("/users", getAlluserController);
userRoutes.get("/users/:id", getUserIdController);

export default userRoutes;
