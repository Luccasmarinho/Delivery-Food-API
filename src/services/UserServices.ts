import type {
  IAuthServiceReturn,
  IPasswordResetToken,
  IPayloadToken,
  IRefreshToken,
  IUser,
  IUserOrderId,
  IUserRepository,
  IUserServices,
  WithoutPass,
} from "../interfaces/user.js";
import generateHashToken, { generateTokenJwt } from "../utils/utils.js";
import {
  emailDoesnotExistsValidator,
  emailExistsValidator,
  invalidUserIdValidator,
  matchPasswordValidator,
  refreshTokenExistsValidator,
  refreshTokenExpiredValidator,
  tokenHashValidator,
  UserIdExistsValidator,
  UserOrderIdExistsValidator,
} from "../validators/userBusinessValidator.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

export class UserServices implements IUserServices {
  constructor(private userRepository: IUserRepository) {}

  async authUser(email: string, password: string): Promise<IAuthServiceReturn> {
    const refreshTokenMs = 7 * 24 * 60 * 60 * 1000; //7 dias em milissegundos

    const emailExists = await emailDoesnotExistsValidator(email);
    await matchPasswordValidator(password, emailExists);

    const payload: IPayloadToken = { id: emailExists.id };
    const secretKey: string = process.env.SECRET_KEY!;

    const acessToken = generateTokenJwt(payload, secretKey, {
      expiresIn: "15m",
    });
    const refreshToken = generateTokenJwt(payload, secretKey, {
      expiresIn: refreshTokenMs / 1000, //converte ms para seg
    });

    const dataRefreshToken: IRefreshToken = {
      refreshToken: refreshToken,
      userId: emailExists.id,
      expiresAt: new Date(Date.now() + refreshTokenMs), //7 dias para expirar
    };
    await this.userRepository.createRefreshToken(dataRefreshToken);

    return { acessToken, refreshToken };
  }

  async registerUser(user: IUser): Promise<WithoutPass> {
    await emailExistsValidator(user.email);

    const { password: dataPassword } = user;
    const hashPassword = await bcrypt.hash(dataPassword, 10);

    const newUser = {
      ...user,
      password: hashPassword,
    };

    const { password, ...registerUserWithoutPassword } =
      await this.userRepository.registerUser(newUser);
    this.registerUserMail(registerUserWithoutPassword.email);
    return registerUserWithoutPassword;
  }

  async sendMailService(
    bcc: string[],
    subject: string,
    html: string
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    (async () => {
      const info = await transporter.sendMail({
        from: `"Luccas Marinho" <${process.env.MAIL_USER}>`,
        bcc,
        subject,
        //   text: "Hello world",
        html,
      });

      console.log("Message sent:", info.messageId);
    })();
  }

  async forgotPasswordMail(email: string): Promise<void> {
    const token = crypto.randomBytes(32).toString("hex");

    const { tokenHash, expiresAt } = generateHashToken(token);

    const userEmailExists = await this.userRepository.findByEmail(email);
    if (!userEmailExists) throw { status: 404, message: "Email not found." };

    const link: string = `http://localhost:3000/auth/reset-password`;
    const html: string = `<div>
    <p>Olá ${userEmailExists.name},</p>
    <p>
      Aqui está o link para alteração de sua senha conforme nos solicitou.
      Basta clicá-lo e você será redirecionado. <a href="${link}/${token}">Clique aqui para redefinir a sua senha.</a>
    </p>
    <p>Caso não tenha sido você, desconsidere este email.</p>
    </div>`;
    const subject: string = "Link para alteração de senha";
    await this.sendMailService([email], subject, html);

    const userIdExists = await this.userRepository.getPasswordResetTokenId(
      userEmailExists.id
    );
    !userIdExists
      ? await this.userRepository.createPasswordResetToken({
          tokenHash,
          userId: userEmailExists.id,
          expiresAt,
        })
      : await this.userRepository.updateUserHashId(userEmailExists.id, {
          tokenHash,
          userId: userEmailExists.id,
          expiresAt,
          createAt: new Date(),
          usedAt: null,
        });
  }

  registerUserMail(email: string): Promise<void> {
    const subject: string = "Criação de conta";
    const html: string = `<h1>Seja muito bem vindo!!!</h1>`;
    return this.sendMailService([email], subject, html);
  }

  async getAllUser(): Promise<WithoutPass[]> {
    const getAllUser = await this.userRepository.getAllUser();
    return getAllUser.map(
      ({ password, ...getAllUserWithoutPassword }) => getAllUserWithoutPassword
    );
  }

  async getUserId(id: number): Promise<WithoutPass> {
    invalidUserIdValidator(id);
    const getUserId = await UserIdExistsValidator(id);
    const { password, ...userIdWithoutPassword } = getUserId;
    return userIdWithoutPassword;
  }

  async getUserOrderId(userId: number): Promise<IUserOrderId[]> {
    invalidUserIdValidator(userId);
    const getUserOrderId = await UserOrderIdExistsValidator(userId);
    return getUserOrderId;
  }

  async logoutUser(refreshToken: string): Promise<void> {
    await refreshTokenExistsValidator(refreshToken);
    await this.userRepository.deleteRefreshToken(refreshToken);
  }

  async refreshToken(dataRefreshToken: string): Promise<string> {
    const getRefreshToken = await refreshTokenExistsValidator(dataRefreshToken);
    await refreshTokenExpiredValidator(getRefreshToken, dataRefreshToken);

    const payload = { id: getRefreshToken.userId };
    const secretKey = process.env.SECRET_KEY!;

    const newAccessToken = generateTokenJwt(payload, secretKey, {
      expiresIn: "15m",
    });

    return newAccessToken;
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const { tokenHash } = generateHashToken(token);
    const tokenHashData = await tokenHashValidator(tokenHash);
  
    const updateDataHash: IPasswordResetToken = {
      ...tokenHashData,
      usedAt: new Date(),
    };

    const hashPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepository.updateUserHashId(
      tokenHashData.userId,
      updateDataHash
    );
    await this.userRepository.updateUserPassword(
      tokenHashData.userId,
      hashPassword
    );
  }
}
