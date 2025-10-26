import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = request.json();
    const { token } = reqBody;
    console.log(token);
    if (!token) {
      return NextResponse.json(
        { error: "Verification token is required" },
        { status: 400 }
      );
    }
    const user = await prisma.user.findFirst({
      where: {
        verifyToken: token,
        verifyTokenExpiry: { gt: new Date() },
      },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verifyToken: null,
        verifyTokenExpiry: null,
      },
    });
    return NextResponse.json({
      message: "Email verified successfully!",
      success: true,
    });
  } catch (error: any) {
    console.error("Error in POST /api route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
