import Express from "express";
const userRoutes = Express.Router();

import registerUserController from "../../controllers/user/registerUserController.js";
userRoutes.post("/auth/register", registerUserController);

export default userRoutes;
