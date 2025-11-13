import createPasswordResetToken from "../../../repositories/user/createPasswordResetToken.js";
import findByEmailRepositorie from "../../../repositories/user/findByEmailRepositorie.js";
import getPasswordResetTokenId from "../../../repositories/user/getPasswordResetTokenId.js";
import updateUserHashIdRepositorie from "../../../repositories/user/updateUserHashRepositorie.js";
import generateHashToken from "../../../utils/utils.js";
import sendMailService from "./sendEmail.js";
import crypto from "crypto";

const forgotPasswordMail = async (email: string): Promise<void> => {
  const token = crypto.randomBytes(32).toString("hex");

  const { tokenHash, expiresAt } = generateHashToken(token);

  const findUserEmail = await findByEmailRepositorie(email);
  if (!findUserEmail) throw { status: 404, message: "Email not found." };

  const link: string = `http://localhost:3000/auth/reset-password`;
  const html: string = `<div>
  <p>Olá ${findUserEmail.name},</p>
  <p>
    Aqui está o link para alteração de sua senha conforme nos solicitou.
    Basta clicá-lo e você será redirecionado. <a href="${link}/${token}">Clique aqui para redefinir a sua senha.</a>
  </p>
  <p>Caso não tenha sido você, desconsidere este email.</p>
  </div>`;
  const subject: string = "Link para alteração de senha";

  const getUserId = await getPasswordResetTokenId(findUserEmail.id);
  !getUserId
    ? await createPasswordResetToken({
        tokenHash,
        userId: findUserEmail.id,
        expiresAt,
      })
    : await updateUserHashIdRepositorie(findUserEmail.id, {
        tokenHash,
        userId: findUserEmail.id,
        expiresAt,
        createAt: new Date(),
        usedAt: null
      });
  return await sendMailService([email], subject, html);
};

export default forgotPasswordMail;
