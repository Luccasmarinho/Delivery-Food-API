import type { IGenerateHashToken } from "../interfaces/user.js";
import crypto from "crypto";

const generateHashToken = (): IGenerateHashToken => {
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); //expira em 15 min
  return { token, tokenHash, expiresAt };
};

export default generateHashToken;
