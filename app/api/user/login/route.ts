import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody;
        console.log('====================================');
        console.log(reqBody);
        console.log('====================================');
        const user = await prisma.user.findFirst({
            where : {
                email,
                isVerified : true
            }
        });
        if(!user){
            return NextResponse.json(
                {error : "user does not exist!,Invalid email! or user not verified!"},
                {status : 400}
            )
        }
        const valiPass = await bcrypt.compare(password,user.password)
        if(!valiPass){
            return NextResponse.json(
                {error : "Invalid Pass!"},
                {status : 400}
            )
        }
        const tokenData = {
            id : user.id,
            email : user.email,
            username : user.username
        }

        const token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"});

        const response = NextResponse.json({
            msg : "Login sucessfully!",
            sucess : true,
            user : {
                id: user.id,
                username: user.username,
                email: user.email,
            }
        })

        response.cookies.set("token",token,{
            httpOnly:true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
            secure:true
        });
        return response;
    } catch (error : any) {
        console.error("Error in POST /api route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
    }

}