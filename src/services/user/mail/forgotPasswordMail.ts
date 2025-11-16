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

  const userEmailExists = await findByEmailRepositorie(email);
  if (!userEmailExists) throw { status: 404, message: "Email not found." };

  const link: string = `http://localhost:3000/auth/reset-password`;
  const html: string = `<div>
  <p>Olá ${userEmailExists.name},</p>
  <p>
    Aqui está o link para alteração de sua senha conforme nos solicitou.
    Basta clicá-lo e você será redirecionado. <a href="${link}/${token}">Clique aqui para redefinir a sua senha.</a>
  </p>
  <p>Caso não tenha sido você, desconsidere este email.</p>
  </div>`;
  const subject: string = "Link para alteração de senha";
  await sendMailService([email], subject, html);

  const userIdExists = await getPasswordResetTokenId(userEmailExists.id);
  !userIdExists
    ? await createPasswordResetToken({
        tokenHash,
        userId: userEmailExists.id,
        expiresAt,
      })
    : await updateUserHashIdRepositorie(userEmailExists.id, {
        tokenHash,
        userId: userEmailExists.id,
        expiresAt,
        createAt: new Date(),
        usedAt: null
      });
};

export default forgotPasswordMail;
