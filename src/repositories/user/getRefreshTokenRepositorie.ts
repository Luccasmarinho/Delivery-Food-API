import type { IRefreshToken } from "../../interfaces/user.js";
import prisma from "../../prismaClient/prismaClient.js";

const getRefreshTokenRepositorie = async (
  refreshToken: string
): Promise<IRefreshToken | void> => {
  try {
    const getRefreshToken = await prisma.refreshToken.findFirst({
      where: {
        refreshToken,
      },
    });
    if (!getRefreshToken) return;
    return getRefreshToken;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getRefreshTokenRepositorie;
