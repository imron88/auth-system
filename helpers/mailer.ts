import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"


export const sendEmail = async({email,emailType,userId} : any)=>{
    try {
        const hasedToken = await bcrypt.hash(userId,10)
        if(emailType === "VERIFY"){
            await prisma.user.update({
                where: { id: userId },
                data: { verifyToken: hasedToken , verifyTokenExpiry : (Date.now() + 3600000).toString() }
            });
        }else if(emailType === "RESET"){
            await prisma.user.update({
                where: { id: userId },
                data: { forgotPasswordToken: hasedToken , forgotPasswordTokenExpiry : (Date.now() + 3600000).toString() }
            });
        }
        var transport = nodemailer.createTransport({
            host: "live.smtp.mailtrap.io",
            port: 587,
            auth: {
                user: "api",
                pass: process.env.TOKEN
            }
        });

        const mailOptions = {
            from : "randomLassi@gmail.com",
            to : email,
            subject : emailType === "VERIFY" ? "Verify your email!" : "Reset your Password!",
            html : `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hasedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email!" : "Reset your Password!"} </p>`
        }
        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse;
    } catch (error : any) {
        throw new Error("error in sendEmail Fn",error)
    }
}
