import type { IPasswordResetToken } from "../../interfaces/user.js";
import prisma from "../../prismaClient/prismaClient.js";

const updateUserHashIdRepositorie = async (
  userId: number,
  data: IPasswordResetToken
): Promise<IPasswordResetToken> => {
  try {
    const updateHash = await prisma.passwordResetToken.update({
      where: {
        userId,
      },
      data,
    });
    return updateHash;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default updateUserHashIdRepositorie;
