import type { IPasswordResetToken } from "../../interfaces/user.js";
import getHashTokenRepositorie from "../../repositories/user/getHashTokenRepositorie.js";
import updateUserHashIdRepositorie from "../../repositories/user/updateUserHashRepositorie.js";
import updateUserPasswordRepositorie from "../../repositories/user/updateUserPasswordRepositorie.js";
import generateHashToken from "../../utils/utils.js";
import bcrypt from "bcrypt";

const resetPasswordService = async (
  token: string,
  newPassword: string
): Promise<void> => {
  const { tokenHash } = generateHashToken(token);
  const tokenHashData = await getHashTokenRepositorie(tokenHash);

  if (!tokenHashData || tokenHashData?.usedAt)
    throw { status: 400, message: "Token already used or invalid." };

  if (new Date() > tokenHashData?.expiresAt!)
    throw { status: 400, message: "Expired token" };

  const updateDataHash: IPasswordResetToken = {
    ...tokenHashData,
    usedAt: new Date(),
  };

  const hashPassword = await bcrypt.hash(newPassword, 10);
  await updateUserHashIdRepositorie(tokenHashData.userId, updateDataHash);
  await updateUserPasswordRepositorie(tokenHashData.userId, hashPassword);
};

export default resetPasswordService;
