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
