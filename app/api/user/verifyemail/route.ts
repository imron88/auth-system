import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = request.json()
    const {token} = reqBody;
    console.log(token);
    const user = await prisma.user.findFirst({
        where : {
            verifyToken :token,
            verifyTokenExpiry : {$gt: Date.now()}
        }
    })
  } catch (error: any) {
    console.error("Error in POST /api route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
