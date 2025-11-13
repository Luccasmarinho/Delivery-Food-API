import nodemailer from "nodemailer";

const sendMailService = async (
  bcc: string[],
  subject: string,
  html: string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  (async () => {
    const info = await transporter.sendMail({
      from: `"Luccas Marinho" <${process.env.MAIL_USER}>`,
      bcc,
      subject,
      //   text: "Hello world",
      html,
    });

    console.log("Message sent:", info.messageId);
  })();
};

export default sendMailService;
