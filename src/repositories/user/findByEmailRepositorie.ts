import type { IUser } from "../../interfaces/user.js";
import prisma from "../../prismaClient/prismaClient.js";

const findByEmailRepositorie = async (email: string): Promise<IUser | void> => {
  try {
    const findEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!findEmail) return;
    return findEmail;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default findByEmailRepositorie;
