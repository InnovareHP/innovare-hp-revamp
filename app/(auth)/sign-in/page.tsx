"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard", // Your existing dashboard route
    });
  };

  return (
    <div className="flex flex-col max-w-md mx-auto gap-4 mt-20">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleSignIn}
        className="bg-blue-600 text-white py-2 rounded"
      >
        Login
      </button>
    </div>
  );
}
