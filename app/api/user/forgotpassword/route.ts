import { sendEmail } from "@/helpers/mailer";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) {
    try {
        const reqBody = await request.json()
        const {email} = reqBody
        console.log('====================================');
        console.log(email);
        console.log('====================================');
        if (!email) {
              return NextResponse.json(
                { error: "Verification token is required" },
                { status: 400 }
              );
        }
        const user = await prisma.user.findUnique({
            where : {
                email
            }
        })
        if (!user) {
              return NextResponse.json(
                { error: "Invalid User" },
                { status: 400 }
              );
        }
    
        sendEmail({email,emailType : "RESET" , userId : user.id})
        return NextResponse.json({
            message: "Password reset link sent to your email!",
            success: true,
        });
    } catch (error :any) {
        console.error("Error in POST /api/user/forgotpassword route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
    }

}