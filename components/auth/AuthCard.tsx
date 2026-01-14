"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      <div className="w-full max-w-md bg-transparent p-8 rounded-2xl shadow-xl">
        <h1 className="text-6xl font-extrabold text-center mb-2 gradient-text ">
          TinyLink
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Shorten URLs with analytics
        </p>

        <div className="flex gap-2 mb-6">
          <Button
            variant={mode === "signin" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setMode("signin")}
          >
            Sign In
          </Button>
          <Button
            variant={mode === "signup" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setMode("signup")}
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

          <Button onClick={handleAuth} className="w-full" disabled={loading}>
            {loading
              ? "Please wait..."
              : mode === "signin"
              ? "Sign In"
              : "Sign Up"}
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("google")}
          >
            Continue with Google
          </Button>
        </div>
      </div>
    </main>
  );
}
