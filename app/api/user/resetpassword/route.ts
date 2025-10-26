import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = request.json();
    const { token,password } = await reqBody;
    console.log(token,password);
    if (!token || !password) {
      return NextResponse.json(
        { error: "token or password is missing!" },
        { status: 400 }
      );
    }
    const user = await prisma.user.findFirst({
      where: {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: { gt: new Date() },
      },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired password link!" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash(password,salt)
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password : hashedPass,
        forgotPasswordToken: null,
        forgotPasswordTokenExpiry: null,
      },
    });
    return NextResponse.json({
      message: "Password reset successfully!",
      success: true,
    });
  } catch (error: any) {
    console.error("Error in POST /api/user/resetpassword route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
