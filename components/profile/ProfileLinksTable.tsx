"use client";

import { useState } from "react";
import { FiCopy, FiTrash2, FiCheck, FiExternalLink } from "react-icons/fi";

export default function ProfileLinksTable({ urls }: { urls: any[] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (shortCode: string, id: string) => {
    const fullUrl = `${window.location.origin}/${shortCode}`;
    await navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this link?")) return;

    await fetch(`/api/links/${id}`, { method: "DELETE" });
    window.location.reload();
  };

  return (
    <div className="rounded-2xl mb-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(0,255,180,0.12)] overflow-hidden">
      <div className="px-6 py-4 border-b border-white/20">
        <h3 className="text-xl font-semibold text-white">Your Links</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-white/60 border-b border-white/20">
            <tr>
              <th className="px-6 py-4 text-left">Short Code</th>
              <th className="px-6 py-4 text-left">Original URL</th>
              <th className="px-6 py-4 text-left">Clicks</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Expires</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {urls.map((url) => {
              const expired = url.expiresAt && new Date() > url.expiresAt;

              return (
                <tr
                  key={url.id}
                  className={`border-b border-white/10 ${
                    expired ? "opacity-50" : ""
                  }`}
                >
                  <td className="px-6 py-4 font-bold">
                    <a
                      href={`/${url.shortCode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition"
                      title="Open short link"
                    >
                      {url.shortCode}
                      <FiExternalLink
                        size={14}
                        className="opacity-0 group-hover:opacity-100 transition"
                      />
                    </a>
                  </td>

                  <td className="px-6 py-4 max-w-xs truncate">
                    <a
                      href={url.originalUrl}
                      target="_blank"
                      className="text-white/80 hover:text-white hover:underline"
                    >
                      {url.originalUrl}
                    </a>
                  </td>

                  <td className="px-6 py-4 text-white">{url.clickCount}</td>

                  <td className="px-6 py-4">
                    {expired ? (
                      <span className="text-red-400">Expired</span>
                    ) : (
                      <span className="text-green-400">Active</span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-white/60">
                    {url.expiresAt
                      ? new Date(url.expiresAt).toLocaleDateString()
                      : "Never"}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleCopy(url.shortCode, url.id)}
                        className="transition hover:scale-110"
                      >
                        {copiedId === url.id ? (
                          <FiCheck
                            className="text-green-400 drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]"
                            size={18}
                          />
                        ) : (
                          <FiCopy
                            className="text-white/70 hover:text-white"
                            size={18}
                          />
                        )}
                      </button>

                      <button
                        onClick={() => handleDelete(url.id)}
                        className="text-red-400 hover:text-red-500 transition hover:scale-110"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
