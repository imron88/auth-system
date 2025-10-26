import { sendEmail } from "@/helpers/mailer";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {username,email,password} = reqBody;
        console.log('====================================');
        console.log(reqBody);
        console.log('====================================');
        const user = await prisma.user.findFirst({
            where : {
                email
            }
        })
        if(user){
            return NextResponse.json(
                {msg : "user already exist!"},
                {status : 400}
            )
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password,salt)
        const savedUser = await prisma.user.create({
            data : {
                username,
                password : hashedPass,
                email
            }
        })
        await sendEmail({email,emailType :"VERIFY", userId : savedUser.id})
        return NextResponse.json({
            msg : "user created SucessFully!",
            sucess : true,
            savedUser
        })
    } catch (error : any) {
        console.error("Error in POST /api/user/signup route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
    }

}