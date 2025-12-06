import type {
  IPasswordResetToken,
  IRefreshToken,
  IUser,
  IUserOrderId,
} from "../interfaces/user.js";
import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/UserRepository.js";
const userRepository = new UserRepository();

export const emailDoesnotExistsValidator = async (
  email: string
): Promise<IUser> => {
  const emailExists = await userRepository.findByEmail(email);
  if (!emailExists) throw { status: 401, message: "Invalid email or password" };
  return emailExists;
};

export const emailExistsValidator = async (email: string): Promise<void> => {
  const emailExists = await userRepository.findByEmail(email);
  if (emailExists) {
    throw {
      status: 409,
      message: "This email address is already registered.",
    };
  }
};

export const matchPasswordValidator = async (
  password: string,
  emailExistsValidator: IUser
): Promise<void> => {
  const matchPassword = await bcrypt.compare(
    password,
    emailExistsValidator.password
  );
  if (!matchPassword)
    throw { status: 401, message: "Invalid email or password" };
};

export const invalidUserIdValidator = (id: number): void => {
  if (isNaN(id) || typeof id !== "number")
    throw { status: 400, message: "Invalid user ID. Expected a number" };
};

export const UserIdExistsValidator = async (id: number): Promise<IUser> => {
  const getUserId = await userRepository.getUserId(id);
  if (!getUserId) throw { status: 404, message: "User not found." };
  return getUserId;
};

export const UserOrderIdExistsValidator = async (
  userId: number
): Promise<IUserOrderId[]> => {
  const getUserOrderId = await userRepository.getUserOrderId(userId);
  if (getUserOrderId.length === 0)
    throw { status: 404, message: "User not found." };
  return getUserOrderId;
};

export const refreshTokenExistsValidator = async (
  refreshToken: string
): Promise<IRefreshToken> => {
  const getRefreshToken = await userRepository.getRefreshToken(refreshToken);

  if (!getRefreshToken || !refreshToken)
    throw { status: 401, message: "Refresh token is required or invalid." };

  return getRefreshToken;
};

export const refreshTokenExpiredValidator = async (
  getRefreshToken: IRefreshToken,
  dataRefreshToken: string
): Promise<void> => {
  if (new Date() > getRefreshToken.expiresAt) {
    await userRepository.deleteRefreshToken(dataRefreshToken);
    throw { status: 401, message: "Refresh token has expired." };
  }
};

export const tokenHashValidator = async (
  tokenHash: string
): Promise<IPasswordResetToken> => {
  const tokenHashData = await userRepository.getHashToken(tokenHash);

  if (!tokenHashData || tokenHashData?.usedAt)
    throw { status: 400, message: "Token already used or invalid." };

  if (new Date() > tokenHashData?.expiresAt!)
    throw { status: 400, message: "Token has expired." };

  return tokenHashData;
};
