import type { IBaseResetToken, IPayloadToken } from "../interfaces/user.js";
import crypto from "crypto";
import z, { ZodObject, ZodString } from "zod";
import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

const generateHashToken = (token: string): IBaseResetToken => {
  // const token = crypto.randomBytes(32).toString("hex");
  const tokenMs = 15 * 60 * 1000 //15 min em milissegundos
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + tokenMs); //expira em 15 min
  return { tokenHash, expiresAt };
};

export const confirmPassword = (schema: ZodString): ZodObject => {
  return z
    .object({
      password: schema,
      confirm_password: schema,
    })
    .refine(({ password, confirm_password }) => password === confirm_password, {
      message: "Passwords must match",
      path: ["confirm_password"],
    });
};

export const generateTokenJwt = (
  payload: IPayloadToken,
  secretKey: string,
  options: SignOptions
): string => {
  return jwt.sign(payload, secretKey!, options);
};

export default generateHashToken;
