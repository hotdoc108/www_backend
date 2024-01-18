import nodemailer from 'nodemailer';

export async function sendResetTokenByEmail(email, resetToken) {
  // Use nodemailer to send the email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
 
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Password Reset',
    text: `Your password reset token is: ${resetToken}`,
  };

  await transporter.sendMail(mailOptions);
}
