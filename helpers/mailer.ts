import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

interface SendEmailParams {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: SendEmailParams) => {
  try {
    const hasedToken = await bcrypt.hash(userId, 10);
    const expiry = new Date(Date.now() + 3600000);
    if (emailType === "VERIFY") {
      await prisma.user.update({
        where: { id: userId },
        data: { verifyToken: hasedToken, verifyTokenExpiry: expiry },
      });
    } else if (emailType === "RESET") {
      await prisma.user.update({
        where: { id: userId },
        data: {
          forgotPasswordToken: hasedToken,
          forgotPasswordTokenExpiry: expiry,
        },
      });
    }
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: "randomLassi@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email!" : "Reset your Password!",
      html:
        emailType === "VERIFY"
          ? `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Email</title>
  </head>
  <body style="margin:0; padding:0; background-color:#111827; font-family:Arial,sans-serif; color:#f9fafb;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#111827; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#1f2937; border-radius:10px; padding:40px; text-align:center;">
            <tr>
              <td>
                <h2 style="color:#f9fafb; margin-bottom:20px;">Verify Your Email</h2>
                <p style="color:#d1d5db; font-size:16px; line-height:24px;">
                  Thank you for registering! Please verify your email by clicking the button below.
                </p>
                <a href="${process.env.DOMAIN}/verifyemail?token=${hasedToken}" 
                   style="display:inline-block; margin-top:30px; padding:12px 24px; background-color:#4f46e5; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:bold;">
                  Verify Email
                </a>
                <p style="color:#9ca3af; font-size:14px; margin-top:30px;">
                  If the button doesn't work, copy and paste the following URL into your browser:<br>
                  <a href="${process.env.DOMAIN}/verifyemail?token=${hasedToken}" style="color:#4f46e5; word-break:break-all;">
                    ${process.env.DOMAIN}/verifyemail?token=${hasedToken}
                  </a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `
          : `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
  </head>
  <body style="margin:0; padding:0; background-color:#111827; font-family:Arial,sans-serif; color:#f9fafb;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#111827; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#1f2937; border-radius:10px; padding:40px; text-align:center;">
            <tr>
              <td>
                <h2 style="color:#f9fafb; margin-bottom:20px;">Reset Your Password</h2>
                <p style="color:#d1d5db; font-size:16px; line-height:24px;">
                  You requested a password reset. Click the button below to set a new password.
                </p>
                <a href="${process.env.DOMAIN}/resetpassword?token=${hasedToken}" 
                   style="display:inline-block; margin-top:30px; padding:12px 24px; background-color:#ef4444; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:bold;">
                  Reset Password
                </a>
                <p style="color:#9ca3af; font-size:14px; margin-top:30px;">
                  If the button doesn't work, copy and paste the following URL into your browser:<br>
                  <a href="${process.env.DOMAIN}/resetpassword?token=${hasedToken}" style="color:#ef4444; word-break:break-all;">
                    ${process.env.DOMAIN}/resetpassword?token=${hasedToken}
                  </a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return {
      success: true,
      message: "Email sent successfully",
      response: mailResponse,
    };
  } catch (error: any) {
    console.error("Error in sendEmail:", error);
    throw error;
  }
};
