import Nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import USER from "@/models/userModel";

const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const token = uuidv4();
    console.log("UUID : ", token);
    
    const mailHtml = `
    <p>
      Verify yourself Click 
        <a href = "${process.env.DOMAIN}/verifyemail?token=${token}"> 
          Here 
        </a> 
      or copy the link and open in browser <br>
      ${process.env.DOMAIN}/verifyemail?token=${token}  
    </p>
    `;

    if (emailType === "VERIFY") {
      await USER.findByIdAndUpdate(userId, {
        verifyToken: token,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await USER.findByIdAndUpdate(userId, {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = Nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER, // Replace with your actual Mailtrap username
        pass: process.env.MAILTRAP_PASS, // Replace with your actual Mailtrap password
      },
    });

    const mailResponse = await transporter.sendMail({
      from: "Mailtrap Test",
      to: email,
      subject: `${
        emailType === "VERIFY" ? "Verify your Email" : "Reset your Password"
      }`,
      html: mailHtml, // HTML body
    });

    // return mailResponse;
  } catch (err) {
    console.log("Mail Sending Error", err.message);
    throw new Error(err.message);
  }
};

export default sendEmail;
