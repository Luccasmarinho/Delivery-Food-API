import prisma from "../../prismaClient/prismaClient.js";
import type { IUser } from "../../interfaces/user.ts";

const registerUserRepositorie = async (user: IUser): Promise<IUser> => {
  try {
    const registerUser = await prisma.user.create({
      data: user,
    });
    return registerUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default registerUserRepositorie;
