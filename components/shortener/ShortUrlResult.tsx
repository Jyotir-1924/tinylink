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

      <p className="text-xs text-gray-600">
        Expires: {expiresAt}
      </p>
    </div>
  );
}
