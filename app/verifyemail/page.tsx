"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status,setStatus] = useState<"verify" | "success" | "error">("verify")
  const [message, setMessage] = useState("");
  const token = searchParams.get("token");
    const handelVerify = async ()=>{
        try {
            const response = await axios.post("/api/user/verifyemail", {token})
            console.log('====================================');
            console.log(response);
            console.log('====================================');
            if (response.data.message === "Email verified successfully!") {
                setStatus("success")
                setMessage(response.data.message || "Email verified successfully!");
            }
        } catch (error : any) {
      console.log("signup failed!", error);
            setStatus("error");
        setMessage(
          error.response?.data?.error || "Failed to verify email. Try again."
        );
        }
    }
  console.log("Token:", token);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Verify Your Email</h1>
        {status === "verify" &&  <>
            <button
              onClick={handelVerify}
              className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition shadow-md"
            >
              Verify Email
            </button>
          </>}

          {status === "success" && (
          <>
            <p className="text-red-500 mb-6">{message}</p>
            <button
              onClick={() => router.push("/login")}
              className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition shadow-md"
            >
              Login here
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <p className="text-red-500 mb-6">{message}</p>
            <button
              onClick={() => router.push("/signup")}
              className="w-full py-2 rounded-lg bg-red-300 hover:bg-red-400 text-white font-semibold transition shadow-md"
            >
              Try Signing Up Again
            </button>
          </>
        )}
          
      </div>
    </div>
  );
}
