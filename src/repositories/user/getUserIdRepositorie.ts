import type { IUser } from "../../interfaces/user.js";
import prisma from "../../prismaClient/prismaClient.js";

const getUserIdRepositorie = async (id: number): Promise<IUser | void> => {
  try {
    const getUserId: IUser | null = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!getUserId) return;
    return getUserId;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getUserIdRepositorie;
