import nodemailer from "nodemailer";

const sendEmails = async ({
  to = [],
  cc = [],
  bcc = [],
  text = "",
  html = "",
  subject = "route",
  attachments = [],
}) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORDGMAIL,
    },
     tls: {
      rejectUnauthorized: false, 
    },
  });

  const info = await transporter.sendMail({
    from: `"jod search " ${process.env.EMAIL}`,
    to,
    cc,
    bcc,
    text,
    html,
    subject,
    attachments,
  });

  return info.rejected.length == 0 ? true : false;
};
export default sendEmails;
