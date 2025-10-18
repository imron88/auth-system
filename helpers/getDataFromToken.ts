import jwt from "jsonwebtoken"
import { NextRequest } from "next/server"


export const getDataFromToken = (request : NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || ""
        const decode : any = jwt.verify(token,process.env.TOKEN_SECRET || "")
        if(!decode){
            throw new Error("invalid token")
        }
        return decode.id
    } catch (error : any) {
        throw new Error(error.message)
    }
}