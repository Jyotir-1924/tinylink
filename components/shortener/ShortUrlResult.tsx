"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function ShortUrlResult({
  shortUrl,
  expiresAt,
}: {
  shortUrl: string;
  expiresAt: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-6 p-5 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(0,255,200,0.15)]">
      <p className="text-sm font-medium text-white/70 mb-2">
        Your shortened URL
      </p>

      <div className="flex items-center gap-3">
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 truncate text-lg text-blue-400 font-medium hover:underline"
        >
          {shortUrl}
        </a>

        <Button
          onClick={handleCopy}
          className="bg-white/10 border border-white/20 text-white hover:bg-white/20"
          size="sm"
        >
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>

      <p className="mt-2 text-xs text-white/50">Expires: {expiresAt}</p>
    </div>
  );
}
