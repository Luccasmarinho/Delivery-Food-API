import prisma from "../../prismaClient/prismaClient.js";

const deleteRefreshTokenRepositorie = async (
  refreshToken: string
): Promise<void> => {
  try {
    await prisma.refreshToken.delete({
      where: { refreshToken },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default deleteRefreshTokenRepositorie;
