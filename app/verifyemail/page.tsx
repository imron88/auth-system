"use client";

import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  console.log("Token:", token);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl font-semibold">Email Verification</h1>
      {token ? (
        <p className="mt-4">Your token: {token}</p>
      ) : (
        <p className="mt-4 text-red-500">No token found!</p>
      )}
    </div>
  );
}
