"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const signUp = async () => {
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: "/dashboard",
    });
    if (error) alert(error.message);
  };

  return (
    <div className="p-10 flex flex-col gap-4 max-w-sm">
      <h1 className="text-xl font-bold">Create Account</h1>
      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        className="border p-2"
      />
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2"
      />
      <button onClick={signUp} className="bg-black text-white p-2">
        Register
      </button>
    </div>
  );
}
