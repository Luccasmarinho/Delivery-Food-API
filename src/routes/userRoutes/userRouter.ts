import Express from "express";
const userRoutes = Express.Router();

userRoutes.post("/auth/register");

export default userRoutes;
