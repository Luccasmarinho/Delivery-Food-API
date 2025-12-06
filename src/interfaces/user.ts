import type { IItemReturn } from "./order.js";
export type WithoutPass = Omit<IUser, "password">;
export type AcessToken = Omit<IAuthServiceReturn, "refreshToken">;
type Role = "ADMIN" | "CLIENT";
export type Status = "PENDING" | "ACCEPTED" | "REJECTED" | "DELIVERED";
export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role?: Role;
}

export interface IBaseResetToken {
  tokenHash: string;
  expiresAt: Date;
}

export interface IPasswordResetToken extends IBaseResetToken {
  userId: number;
  createAt?: Date;
  usedAt?: Date | null;
}

export interface IPayloadToken {
  id: number;
}

export interface IRefreshToken {
  refreshToken: string;
  userId: number;
  createAt?: Date;
  expiresAt: Date;
}

export interface IAuthServiceReturn {
  acessToken: string;
  refreshToken: string;
}

export interface IVerifyToken {
  id: number;
  iat: number;
  exp: number;
}

export interface IUserOrderId {
  id: number;
  total: number;
  status: Status;
  createdAt: Date;
  items: IItemReturn[];
}

export interface IUserRepository {
  createPasswordResetToken(
    data: IPasswordResetToken
  ): Promise<IPasswordResetToken>;
  createRefreshToken(dataRefreshToken: IRefreshToken): Promise<IRefreshToken>;
  deleteRefreshToken(refreshToken: string): Promise<void>;
  findByEmail(email: string): Promise<IUser | void>;
  getAllUser(): Promise<IUser[]>;
  getHashToken(tokenHash: string): Promise<IPasswordResetToken | null>;
  getPasswordResetTokenId(userId: number): Promise<IPasswordResetToken | void>;
  getRefreshToken(refreshToken: string): Promise<IRefreshToken | void>;
  getUserId(id: number): Promise<IUser | void>;
  getUserOrderId(userId: number): Promise<IUserOrderId[]>;
  registerUser(user: IUser): Promise<IUser>;
  updateUserHashId(
    userId: number,
    data: IPasswordResetToken
  ): Promise<IPasswordResetToken>;
  updateUserPassword(id: number, newPassword: string): Promise<IUser>;
}

export interface IUserServices {
  authUser(email: string, password: string): Promise<IAuthServiceReturn>;
  registerUser(user: IUser): Promise<WithoutPass>;
  sendMailService(bcc: string[], subject: string, html: string): Promise<void>;
  forgotPasswordMail(email: string): Promise<void>;
  registerUserMail(email: string): Promise<void>;
  getAllUser(): Promise<WithoutPass[]>;
  getUserId(id: number): Promise<WithoutPass>;
  getUserOrderId(userId: number): Promise<IUserOrderId[]>;
  logoutUser(refreshToken: string): Promise<void>;
  refreshToken(dataRefreshToken: string): Promise<string>;
  resetPassword(token: string, newPassword: string): Promise<void>;
}
