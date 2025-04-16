"use client";

import { signIn } from "next-auth/react";

export default function AuthPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700"
      >
        Sign in with Google
      </button>
    </div>
  );
}
