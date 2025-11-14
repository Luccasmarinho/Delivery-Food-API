import * as z from "zod";
import { confirmPassword } from "../utils/utils.js";

const schemaPassword = z
  .string()
  .min(8)
  .max(20)
  .regex(/^\S+$/, "The field cannot contain spaces.");

const schemaUser = {
  registerUser: z
    .object({
      name: z.string().min(1),
      email: z.email(),
      password: schemaPassword,
      confirm_password: schemaPassword,
      role: z.enum(["ADMIN", "CLIENT"]).optional(),
    })
    .and(confirmPassword(schemaPassword)),
  forgotPassword: z.object({
    email: z.email(),
  }),
  resetPassword: confirmPassword(schemaPassword),
  login: z.object({
    email: z.email(),
    password: schemaPassword,
  }),
};

// export type RegisterUserType = z.infer<typeof schemaUser.registerUser>;
export default schemaUser;
