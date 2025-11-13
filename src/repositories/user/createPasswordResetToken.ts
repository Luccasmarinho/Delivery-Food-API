import prisma from "../../prismaClient/prismaClient.js";
import type {IPasswordResetToken} from "../../interfaces/user.js"

const createPasswordResetToken = async (data: IPasswordResetToken): Promise<IPasswordResetToken> => {
  try {
    const createToken = await prisma.passwordResetToken.create({
      data
    });

    return createToken
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default createPasswordResetToken;
