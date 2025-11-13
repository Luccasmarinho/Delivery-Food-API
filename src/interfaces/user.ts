export type WithoutPass = Omit<IUser, "password">;

type Role = "ADMIN" | "CLIENT";
export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role?: Role;
}

interface IBaseResetToken {
  tokenHash: string;
  expiresAt: Date;
}

export interface IPasswordResetToken extends IBaseResetToken {
  userId: number;
  createAt?: Date;
}

export interface IGenerateHashToken extends IBaseResetToken {
  token: string;
}
