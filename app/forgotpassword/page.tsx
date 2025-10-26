"use client";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    try {
      const res = await axios.post("/api/user/forgotpassword", { email });
      setStatus("success");
      setMessage(res.data.message || "Password reset link sent to your email!");
    } catch (err: any) {
      setStatus("error");
      setMessage(
        err.response?.data?.error || "Failed to send reset link. Try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700 text-center">
        <h1 className="text-3xl font-bold text-white mb-6">Forgot Password</h1>
        <p className="text-gray-300 mb-6">
          Enter your email address and we’ll send you a link to reset your
          password.
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-4 transition"
        />

        <button
          onClick={handleForgotPassword}
          className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition shadow-md"
        >
          Send Reset Link
        </button>

        {status === "success" && (
          <p className="text-green-400 mt-4">{message}</p>
        )}
        {status === "error" && <p className="text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
