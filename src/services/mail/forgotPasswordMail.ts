import findByEmailRepositorie from "../../repositories/user/findByEmailRepositorie.js";
import sendMailService from "./sendEmail.js";
import jwt from "jsonwebtoken";

const forgotPasswordMail = async (email: string): Promise<void> => {
  const findUserEmail = await findByEmailRepositorie(email);
  if (!findUserEmail) throw { status: 404, message: "Email not found." };

  const link: string = `http://localhost:3000/auth/reset-password`;
  const token: string = jwt.sign({ email }, process.env.SECRET_KEY!, {
    expiresIn: "10h",
  });
  const html: string = `<div>
  <p>Olá ${findUserEmail.name},</p>
  <p>
    Aqui está o link para alteração de sua senha conforme nos solicitou.
    Basta clicá-lo e você será redirecionado. <a href="${link}/${token}">Clique aqui para redefinir a sua senha.</a>
  </p>
  <p>Caso não tenha sido você, desconsidere este email.</p>
  </div>`;
  const subject: string = "Link para alteração de senha";
  await sendMailService([email], subject, html);
};

export default forgotPasswordMail;
