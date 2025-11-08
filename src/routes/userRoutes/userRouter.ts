import Express from "express";
const userRoutes = Express.Router();

import registerUser from "../../controllers/user/registerUser.js";
userRoutes.post("/auth/register", registerUser);

export default userRoutes;
