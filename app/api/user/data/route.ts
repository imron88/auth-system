import { getDataFromToken } from "@/helpers/getDataFromToken";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const id = await getDataFromToken(request)
        const user = await prisma.user.findFirst({
            where : {
                id
            },
            select : {
                username : true,
                id : true,
                email : true
            }
        })
        if (!user) {
            return NextResponse.json(
                { error: "User does not exist!" },
                { status: 404 }
            );
        }
        const response = NextResponse.json({
            user
        })
        return response;
    } catch (error : any) {
        console.error("Error in POST /api route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
    }

}