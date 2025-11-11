import registerUserRepositorie from "../../repositories/user/registerUserRepositorie.js";
import type { IUser, WithoutPass } from "../../interfaces/user.ts";
import findByEmailRepositorie from "../../repositories/user/findByEmailRepositorie.js";
import bcrypt from "bcrypt";
import registerUserMail from "../mail/registerUserMail.js";

const registerUserService = async (user: IUser): Promise<WithoutPass> => {
  const emailExists = await findByEmailRepositorie(user.email);
  if (emailExists) {
    throw { status: 409, message: "This email address is already registered." };
  }
  const { password: dataPassword } = user;
  const hashPassword = await bcrypt.hash(dataPassword, 10);

  const newUser = {
      ...user,
      password: hashPassword,
  }
  
  const { password, ...registerUserWithoutPasswor } = await registerUserRepositorie(newUser);
  registerUserMail(registerUserWithoutPasswor.email)
  return registerUserWithoutPasswor;
};

export default registerUserService;
