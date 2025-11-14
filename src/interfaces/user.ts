export type WithoutPass = Omit<IUser, "password">;

type Role = "ADMIN" | "CLIENT";
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
  id: number
}

export interface IRefreshToken {
  token: string;
  userId: number;
  createAt?: Date;
  expiresAt: Date;
}

export interface IAuthServiceReturn {
  acessToken: string;
  refreshToken: string;
}


// export interface IGenerateHashToken extends IBaseResetToken {
//   token: string;
// }
