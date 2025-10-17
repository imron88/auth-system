import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            msg:"Logout Success!",
            status : 200,
            success:true
        })
        response.cookies.delete("token")
        return response
    } catch (error:any) {
        console.error("Error in POST /api route:", error);
            return NextResponse.json(
              { error: "Internal Server Error", details: error.message },
              { status: 500 }
            );
    }
}