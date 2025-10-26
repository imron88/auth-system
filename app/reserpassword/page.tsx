"use client";
import {  useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token"); 

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setStatus("error");
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("/api/user/resetpassword", { token, password });
      setStatus("success");
      setMessage(res.data.message || "Password reset successfully!");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.response?.data?.error || "Failed to reset password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700 text-center">
        <h1 className="text-3xl font-bold text-white mb-6">Reset Password</h1>
        <p className="text-gray-300 mb-6">
          Enter your new password to reset your account password.
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-4 transition"
        />

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-4 transition"
        />

        <button
          onClick={handleResetPassword}
          className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition shadow-md"
        >
          Reset Password
        </button>

        {status === "success" && (
          <p className="text-green-400 mt-4">{message}</p>
        )}
        {status === "error" && <p className="text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
