import type { IUser } from "../../interfaces/user.js";
import prisma from "../../prismaClient/prismaClient.js";

const updateUserPasswordRepositorie = async (
  id: number,
  newPassword: string
): Promise<IUser> => {
  try {
    const updatePassword = await prisma.user.update({
      where: {
        id,
      },
      data: { password: newPassword },
    });
    return updatePassword;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default updateUserPasswordRepositorie;
