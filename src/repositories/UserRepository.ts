import type {
  IPasswordResetToken,
  IRefreshToken,
  IUser,
  IUserOrderId,
  IUserRepository,
} from "../interfaces/user.js";
import prisma from "../prismaClient/prismaClient.js";

export class UserRepository implements IUserRepository {
  async createPasswordResetToken(
    data: IPasswordResetToken
  ): Promise<IPasswordResetToken> {
    try {
      const createToken = await prisma.passwordResetToken.create({
        data,
      });

      return createToken;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async createRefreshToken(
    dataRefreshToken: IRefreshToken
  ): Promise<IRefreshToken> {
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
  }

  async deleteRefreshToken(refreshToken: string): Promise<void> {
    try {
      await prisma.refreshToken.delete({
        where: { refreshToken },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async findByEmail(email: string): Promise<IUser | void> {
    try {
      const findEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!findEmail) return;
      return findEmail;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAllUser(): Promise<IUser[]> {
    try {
      const getAllUser: IUser[] = await prisma.user.findMany();
      return getAllUser;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getHashToken(tokenHash: string): Promise<IPasswordResetToken | null> {
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
  }

  async getPasswordResetTokenId(
    userId: number
  ): Promise<IPasswordResetToken | void> {
    try {
      const getResetTokenId = await prisma.passwordResetToken.findFirst({
        where: {
          userId,
        },
      });
      if (!getResetTokenId) return;
      return getResetTokenId;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getRefreshToken(refreshToken: string): Promise<IRefreshToken | void> {
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
  }

  async getUserId(id: number): Promise<IUser | void> {
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
  }

  async getUserOrderId(userId: number): Promise<IUserOrderId[]> {
    try {
      const getUserOrderId = await prisma.order.findMany({
        where: { userId },
        select: {
          id: true,
          total: true,
          status: true,
          createdAt: true,

          items: {
            select: {
              productId: true,
              quantity: true,

              product: {
                select: {
                  name: true,
                  price: true,
                },
              },
            },
          },
        },
      });
      return getUserOrderId;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async registerUser(user: IUser): Promise<IUser> {
    try {
      const registerUser = await prisma.user.create({
        data: user,
      });
      return registerUser;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateUserHashId(
    userId: number,
    data: IPasswordResetToken
  ): Promise<IPasswordResetToken> {
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
  }

  async updateUserPassword(
    id: number,
    newPassword: string
  ): Promise<IUser> {
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
  }
}
