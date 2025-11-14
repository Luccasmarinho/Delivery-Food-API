import findByEmailRepositorie from "../../repositories/user/findByEmailRepositorie.js";
import bcrypt from "bcrypt";
import { generateTokenJwt } from "../../utils/utils.js";
import type {
  IAuthServiceReturn,
  IPayloadToken,
  IRefreshToken,
} from "../../interfaces/user.js";
import createRefreshTokenRepositorie from "../../repositories/user/createRefreshTokenRepositorie.js";

const authUserService = async (
  email: string,
  password: string
): Promise<IAuthServiceReturn> => {
  const emailExists = await findByEmailRepositorie(email);
  if (!emailExists) throw { status: 401, message: "Invalid email or password" };

  const matchPassword = await bcrypt.compare(password, emailExists.password);
  if (!matchPassword)
    throw { status: 401, message: "Invalid email or password" };

  const payload: IPayloadToken = { id: emailExists.id };
  const secretKey: string = process.env.SECRET_KEY!;

  const acessToken = generateTokenJwt(payload, secretKey, { expiresIn: "15m" });
  const refreshToken = generateTokenJwt(payload, secretKey, {
    expiresIn: "7d",
  });

  const dataRefreshToken: IRefreshToken = {
    token: refreshToken,
    userId: emailExists.id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };
  await createRefreshTokenRepositorie(dataRefreshToken);

  return { acessToken, refreshToken };
};

export default authUserService;
