import type { IBaseResetToken } from "../interfaces/user.js";
import crypto from "crypto";
import z, { ZodObject, ZodString } from "zod";

const generateHashToken = (token: string): IBaseResetToken => {
  // const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); //expira em 15 min
  return { tokenHash, expiresAt };
};

export const confirmPassword = (schema: ZodString): ZodObject => {
  return z.object({
    password: schema,
    confirm_password: schema,
  }).refine(({ password, confirm_password }) => password === confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"],
  });
};

export default generateHashToken;
