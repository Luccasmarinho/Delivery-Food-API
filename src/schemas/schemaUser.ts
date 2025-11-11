import * as z from "zod";

const schemaUser = {
  registerUser: z.object({
    name: z.string().min(1),
    email: z.email(),
    password: z.string().min(8).max(20).regex(/^\S+$/, "The field cannot contain spaces."),
    role: z.enum(["ADMIN", "CLIENT"]).optional(),
  }),
  forgotPassword: z.object({
    email: z.email(),
  }), 
};

// export type RegisterUserType = z.infer<typeof schemaUser.registerUser>;
export default schemaUser;
