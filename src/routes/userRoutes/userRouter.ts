import Express from "express";
const userRoutes = Express.Router();

import schemaUser from "../../schemas/schemaUser.js";
import validateBody from "../../middleware/validateBody.js";
import userFactory from "../../factories/userFactory.js";
import authTokenAutenticate from "../../middleware/authTokenAutenticate.js";
import userAuthorizathion from "../../middleware/userAuthorization.js";

userRoutes.post(
  "/auth/register",
  validateBody(schemaUser.registerUser),
  (req, res, next) => userFactory().registerUser(req, res, next)
);

userRoutes.post(
  "/auth/forgot-password",
  validateBody(schemaUser.forgotPassword),
  (req, res, next) => userFactory().forgotPassword(req, res, next)
);

userRoutes.post(
  "/auth/reset-password/:token",
  validateBody(schemaUser.resetPassword),
  (req, res, next) => userFactory().resetPassword(req, res, next)
);

userRoutes.post(
  "/auth/login",
  validateBody(schemaUser.login),
  (req, res, next) => userFactory().authUser(req, res, next)
);

userRoutes.post("/auth/refresh-token", (req, res, next) =>
  userFactory().refreshToken(req, res, next)
);

userRoutes.get(
  "/users",
  authTokenAutenticate,
  userAuthorizathion,
  (req, res, next) => userFactory().getAlluser(req, res, next)
);

userRoutes.get(
  "/users/:id",
  authTokenAutenticate,
  userAuthorizathion,
  (req, res, next) => userFactory().getUserId(req, res, next)
);

userRoutes.post("/auth/logout", authTokenAutenticate, (req, res, next) =>
  userFactory().logoutUser(req, res, next)
);

userRoutes.get(
  "/users/:userId/orders",
  authTokenAutenticate,
  userAuthorizathion,
  (req, res, next) => userFactory().getUserOrderId(req, res, next)
);

export default userRoutes;
