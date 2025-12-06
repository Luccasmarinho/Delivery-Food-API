import type { Request, Response, NextFunction } from "express";
import type {
  AcessToken,
  IUserOrderId,
  IUserServices,
  WithoutPass,
} from "../interfaces/user.js";

export class UserController {
  constructor(private userService: IUserServices) {}

  async authUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<AcessToken> | void> {
    try {
      const { email, password } = req.body;
      const { acessToken, refreshToken } = await this.userService.authUser(
        email,
        password
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, //em prod mudar para true
        path: "/auth",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      return res.status(200).json({ acessToken });
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<string> | void> {
    try {
      const { email } = req.body;
      await this.userService.forgotPasswordMail(email);
      return res.status(200).json({
        message:
          "An email with information on how to recover your password has been sent.",
      });
    } catch (error) {
      next(error);
    }
  }

  async getAlluser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<WithoutPass> | void> {
    try {
      const getAllUser = await this.userService.getAllUser();
      return res.status(200).json(getAllUser);
    } catch (error) {
      next(error);
    }
  }

  async getUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<WithoutPass> | void> {
    try {
      const { id } = req.params;
      const getUserId = await this.userService.getUserId(Number(id));
      return res.status(200).json(getUserId);
    } catch (error) {
      return next(error);
    }
  }

  async getUserOrderId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUserOrderId[]> | void> {
    try {
      const { userId } = req.params;
      const getUserOrder = await this.userService.getUserOrderId(
        Number(userId)
      );
      return res.status(200).json(getUserOrder);
    } catch (error) {
      next(error);
    }
  }

  async logoutUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void> | void> {
    try {
      await this.userService.logoutUser(req.cookies.refreshToken);
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false, //em prod mudar para true
        path: "/auth",
      });
      return res.status(200).json({ Messaage: "Logout successful." });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<string> | void> {
    try {
      const { refreshToken } = req.cookies;
      const newAccessToken = await this.userService.refreshToken(refreshToken);
      return res.status(200).json({ newAccessToken });
    } catch (error) {
      next(error);
    }
  }

  async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { confirm_password, ...body } = req.body;
      const registerUser = await this.userService.registerUser(body);
      return res.status(201).json(registerUser);
    } catch (error) {
      return next(error);
    }
  }

  async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<string> | void> {
    try {
      const {
        params: { token },
        body: { password },
      } = req;
      await this.userService.resetPassword(token!, password);
      return res
        .status(200)
        .json({ message: "Password changed successfully." });
    } catch (error) {
      next(error);
    }
  }
}
