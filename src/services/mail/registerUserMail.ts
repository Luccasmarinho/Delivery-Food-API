import sendMailService from "./sendEmail.js";

const registerUserMail = (email: string): Promise<void> => {
  const subject: string = "Criação de conta";
  const html: string = `<h1>Seja muito bem vindo!!!</h1>`;
  return sendMailService([email], subject, html);
};

export default registerUserMail;
