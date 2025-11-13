import type { IPasswordResetToken } from "../../interfaces/user.js";
import prisma from "../../prismaClient/prismaClient.js";

const getHashTokenRepositorie = async (
  tokenHash: string
): Promise<IPasswordResetToken | null> => {
  try {
    const getHash = await prisma.passwordResetToken.findFirst({
      where: {
        tokenHash,
      },
    });
   
    return getHash;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getHashTokenRepositorie;
