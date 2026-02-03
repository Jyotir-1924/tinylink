"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";

export default function AuthCard() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async () => {
    setLoading(true);
    setError("");

    try {
      if (mode === "signup") {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Registration failed");
          return;
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center app-bg">
      <div className="w-full max-w-md bg-transparent p-8 rounded-2xl shadow-xl border border-white/20">
        <h1 className="text-6xl font-extrabold text-center mb-2 gradient-text">
          TinyLink
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Shorten URLs with analytics
        </p>
        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setMode("signin")}
            className={`flex-1 border transition ${
              mode === "signin"
                ? "bg-white text-black border-black hover:bg-gray-100"
                : "bg-black text-white border-white/50"
            }`}
          >
            Sign In
          </Button>

          <Button
            onClick={() => setMode("signup")}
            className={`flex-1 border transition ${
              mode === "signup"
                ? "bg-white text-black border-black hover:bg-gray-100"
                : "bg-black text-white border-white/50"
            }`}
          >
            Sign Up
          </Button>
        </div>
        <div className="space-y-4">
          {mode === "signup" && (
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAuth()}
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button
            onClick={handleAuth}
            className=" w-full bg-white/10 text-white border border-transparent transition-all hover:bg-white hover:text-black"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : mode === "signin"
                ? "Sign In"
                : "Sign Up"}
          </Button>

          <Button
            onClick={() => signIn("google")}
            className=" w-full bg-white/10 text-white border border-transparent transition-all hover:bg-white hover:text-black"
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>
        </div>
      </div>
    </main>
  );
}
