import nodemailer from "nodemailer";

const mailSender = async (toEmail, subject, textContent) => {
  try {
    let transporter = nodemailer.createTransport({
      service: process.env.host,
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });

    // send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: subject,
      text: textContent,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export default mailSender;
