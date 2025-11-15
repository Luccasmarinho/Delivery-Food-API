import type { IRefreshToken } from "../../interfaces/user.js";
import prisma from "../../prismaClient/prismaClient.js";

const createRefreshTokenRepositorie = async (
  dataRefreshToken: IRefreshToken
): Promise<IRefreshToken> => {
  try {
    const createRefreshToken = await prisma.refreshToken.upsert({
      where: {
        refreshToken: dataRefreshToken.refreshToken,
      },
      update: {},
      create: dataRefreshToken,
    });
    return createRefreshToken;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default createRefreshTokenRepositorie;
