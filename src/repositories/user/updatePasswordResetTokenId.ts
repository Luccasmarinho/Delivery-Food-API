import type { IPasswordResetToken } from "../../interfaces/user.js";
import prisma from "../../prismaClient/prismaClient.js";

const updatePasswordResetTokenId = async (
  userId: number,
  data: IPasswordResetToken
): Promise<IPasswordResetToken> => {
  try {
    const updateResetTokenId = await prisma.passwordResetToken.update({
      where: {
        userId,
      },
      data,
    });
    return updateResetTokenId;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default updatePasswordResetTokenId;
