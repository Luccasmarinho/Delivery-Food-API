import registerUserRepositorie from "../../repositories/user/registerUserRepositorie.js";
import type { IUser } from "../../interfaces/user.ts";
import findByEmailRepositorie from "../../repositories/user/findByEmailRepositorie.js";
import bcrypt from "bcrypt";

const registerUserService = async (user: IUser) => {
  const emailExists = await findByEmailRepositorie(user.email);
  if (emailExists) {
    throw { status: 409, message: "This email address is already registered." };
  }
  const { password } = user;
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = {
      ...user,
      password: hashPassword,
  }

  const registerUser = await registerUserRepositorie(newUser);
  return registerUser;
};

export default registerUserService;
