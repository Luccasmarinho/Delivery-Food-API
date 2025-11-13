import createPasswordResetToken from "../../repositories/user/createPasswordResetToken.js";
import findByEmailRepositorie from "../../repositories/user/findByEmailRepositorie.js";
import getPasswordResetTokenId from "../../repositories/user/getPasswordResetTokenId.js";
import updatePasswordResetTokenId from "../../repositories/user/updatePasswordResetTokenId.js";
import generateResetToken from "../../utils/utils.js";
import sendMailService from "./sendEmail.js";

const forgotPasswordMail = async (email: string): Promise<void> => {
  const { tokenHash, expiresAt, token } = generateResetToken();

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
    : await updatePasswordResetTokenId(findUserEmail.id, {
        tokenHash,
        userId: findUserEmail.id,
        expiresAt,
        createAt: new Date()
      });
  return await sendMailService([email], subject, html);
};

export default forgotPasswordMail;
