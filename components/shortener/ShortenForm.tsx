"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ShortUrlResult from "./ShortUrlResult";

export default function ShortenForm() {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async () => {
    if (!url) return;

    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          customCode: customCode || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to shorten URL");
        return;
      }

      setShortUrl(`${window.location.origin}/${data.shortCode}`);
      setExpiresAt(new Date(data.expiresAt).toLocaleString());
      setUrl("");
      setCustomCode("");
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl rounded-2xl p-8 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(0,255,180,0.15)]">
      <h2 className="text-3xl font-bold mb-2 text-center">Shorten your URL</h2>
      <p className="text-center text-white/60 mb-8">
        Links expire after 3 days
      </p>

      <div className="space-y-4">
        <Input
          placeholder="https://example.com/long-url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleShorten()}
        />

        <Input
          placeholder="Custom code (optional)"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleShorten()}
        />

        <Button
          className="w-1/2 mx-auto block"
          onClick={handleShorten}
          disabled={loading}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </Button>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {shortUrl && <ShortUrlResult shortUrl={shortUrl} expiresAt={expiresAt} />}
    </div>
  );
}
