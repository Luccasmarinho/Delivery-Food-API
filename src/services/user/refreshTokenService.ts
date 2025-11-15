import deleteRefreshTokenRepositorie from "../../repositories/user/deleteRefreshTokenRepositorie.js";
import getRefreshTokenRepositorie from "../../repositories/user/getRefreshTokenRepositorie.js";
import { generateTokenJwt } from "../../utils/utils.js";

const refreshTokenService = async (refreshToken: string): Promise<string> => {
  if (!refreshToken)
    throw { status: 401, message: "Refresh token is required." };

  const getRefreshToken = await getRefreshTokenRepositorie(refreshToken);

  if (!getRefreshToken)
    throw { status: 401, message: "Refresh token is missing or invalid." };

  if (new Date() > getRefreshToken.expiresAt) {
    await deleteRefreshTokenRepositorie(refreshToken);
    throw { status: 401, message: "Refresh token has expired." };
  }

  const payload = { id: getRefreshToken.userId };
  const secretKey = process.env.SECRET_KEY!;

  const newAccessToken = generateTokenJwt(payload, secretKey, {
    expiresIn: "15m",
  });

  return newAccessToken;
};

export default refreshTokenService;
