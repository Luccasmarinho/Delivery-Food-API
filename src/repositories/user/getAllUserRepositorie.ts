import type { IUser } from "../../interfaces/user.js";
import prisma from "../../prismaClient/prismaClient.js";

const getAllUserRepositorie = async (): Promise<IUser[]> => {
  try {
    const getAllUser: IUser[] = await prisma.user.findMany();
    return getAllUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getAllUserRepositorie;
