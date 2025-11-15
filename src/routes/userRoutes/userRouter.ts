import Express from "express";
const userRoutes = Express.Router();

import schemaUser from "../../schemas/schemaUser.js";
import validateBody from "../../middleware/validateBody.js";

//post
import registerUserController from "../../controllers/user/registerUserController.js";
import resetPasswordController from "../../controllers/user/resetPasswordController.js";
import forgotPasswordController from "../../controllers/user/forgotPasswordController.js";
import authUserController from "../../controllers/user/authUserController.js";
import refreshTokenController from "../../controllers/user/refreshTokenController.js";

//get
import getAlluserController from "../../controllers/user/getAllUserController.js";
import getUserIdController from "../../controllers/user/getUserIdController.js";

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

userRoutes.post(
  "/auth/reset-password/:token",
  validateBody(schemaUser.resetPassword),
  resetPasswordController
);

userRoutes.post(
  "/auth/login",
  validateBody(schemaUser.login),
  authUserController
);

userRoutes.post("/auth/refresh-token", refreshTokenController);

userRoutes.get("/users", getAlluserController);
userRoutes.get("/users/:id", getUserIdController);

export default userRoutes;
