import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody;
        console.log('====================================');
        console.log(reqBody);
        console.log('====================================');
        const user = await prisma.user.findFirst({
            where : {
                email
            }
        });
        if(!user){
            return NextResponse.json(
                {error : "user does not exist!"},
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
        
        
    } catch (error : any) {
        console.error("Error in POST /api route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
    }

}