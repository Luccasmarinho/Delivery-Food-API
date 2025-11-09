import Express from "express";
const userRoutes = Express.Router();

import registerUserController from "../../controllers/user/registerUserController.js";

import schemaUser from "../../schemas/schemaUser.js";
import validateBody from "../../middleware/validateBody.js";
userRoutes.post(
  "/auth/register",
  validateBody(schemaUser.registerUser),
  registerUserController
);

export default userRoutes;
