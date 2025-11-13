import type { IPasswordResetToken } from "../../interfaces/user.js";
import getHashTokenRepositorie from "../../repositories/user/getHashTokenRepositorie.js";
import updateUserHashIdRepositorie from "../../repositories/user/updateUserHashRepositorie.js";
import generateHashToken from "../../utils/utils.js";

const resetPasswordService = async (token: string) => {
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

  await updateUserHashIdRepositorie(tokenHashData.userId, updateDataHash);
};

export default resetPasswordService;
