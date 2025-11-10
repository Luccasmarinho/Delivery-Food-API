type Role = "ADMIN" | "CLIENT";
export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

export type WithoutPass = Omit<IUser, "password">
