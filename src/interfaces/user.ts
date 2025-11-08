enum Role {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT"
}
export interface IUser {
  name: string;
  email: string;
  password: string;
  // role?: Role
}
