import deleteRefreshTokenRepositorie from "../../repositories/user/deleteRefreshTokenRepositorie.js";
import getRefreshTokenRepositorie from "../../repositories/user/getRefreshTokenRepositorie.js";

const logoutUserService = async (refreshToken: string): Promise<void> => {
  const getRefreshToken = await getRefreshTokenRepositorie(refreshToken);
 
  if (!getRefreshToken || !refreshToken)
    throw { status: 404, message: "Refresh token not found." };

  await deleteRefreshTokenRepositorie(refreshToken);
};
export default logoutUserService;
