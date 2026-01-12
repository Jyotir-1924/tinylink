"use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async () => {
    if (!url) return;
    
    setLoading(true);
    setShortUrl("");
    setCopied(false);
    setError("");
    setExpiresAt("");

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          url,
          customCode: customCode || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setShortUrl(`${window.location.origin}/${data.shortCode}`);
        setExpiresAt(new Date(data.expiresAt).toLocaleString());
        setUrl("");
        setCustomCode("");
      } else {
        setError(data.error || "Failed to shorten URL");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">TinyLink</h1>
          <p className="text-gray-600 mb-8">Shorten your URLs with custom codes and analytics</p>
          <Button onClick={() => signIn("google")} size="lg">
            Sign in with Google
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">TinyLink</h1>
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <Button variant="ghost" onClick={() => signOut()}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4">
        <div className="w-full max-w-2xl">
          <h2 className="text-3xl font-bold mb-2 text-center">Shorten Your URL</h2>
          <p className="text-gray-600 mb-8 text-center">Create short links that expire in 3 days</p>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Enter URL</label>
              <Input
                placeholder="https://example.com/very/long/url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleShorten()}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Custom Short Code (Optional)</label>
              <Input
                placeholder="my-custom-link"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleShorten()}
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty for auto-generated code
              </p>
            </div>
            <Button 
              onClick={handleShorten} 
              disabled={loading || !url}
              className="w-full"
              size="lg"
            >
              {loading ? "Shortening..." : "Shorten URL"}
            </Button>
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          {shortUrl && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm font-medium mb-2">Your shortened URL:</p>
              <div className="flex items-center gap-2 mb-2">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline flex-1 truncate"
                >
                  {shortUrl}
                </a>
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
              <p className="text-xs text-gray-600">Expires: {expiresAt}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}