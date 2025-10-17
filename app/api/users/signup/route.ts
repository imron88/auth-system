import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {username,email,password} = reqBody;
        console.log('====================================');
        console.log(reqBody);
        console.log('====================================');
    } catch (error : any) {
        console.error("Error in POST /api route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
    }

}