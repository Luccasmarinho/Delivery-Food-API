import prisma from "../../prismaClient/prismaClient.js";
import type {IPasswordResetToken} from "../../interfaces/user.js";

const getPasswordResetTokenId = async (userId: number): Promise<IPasswordResetToken | void> => {
  try {
    const getResetTokenId = await prisma.passwordResetToken.findFirst({
        where: {
            userId
        }
    })
    if(!getResetTokenId) return
    return getResetTokenId
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getPasswordResetTokenId;
// mudar os nomes depois