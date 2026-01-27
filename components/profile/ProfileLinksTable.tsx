"use client";

import { FiCopy, FiTrash2 } from "react-icons/fi";

const handleCopy = async (shortCode: string) => {
  const fullUrl = `${window.location.origin}/${shortCode}`;
  await navigator.clipboard.writeText(fullUrl);
};

const handleDelete = async (id: string) => {
  if (!confirm("Delete this link?")) return;

  await fetch(`/api/links/${id}`, {
    method: "DELETE",
  });

  window.location.reload();
};

export default function ProfileLinksTable({ urls }: { urls: any[] }) {
  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(0,255,180,0.12)] overflow-hidden">
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
                  <td className="px-6 py-4 font-bold text-blue-400 ">
                    {url.shortCode}
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
                      {/* Copy */}
                      <button
                        onClick={() => handleCopy(url.shortCode)}
                        title="Copy link"
                        className="
        text-white/70
        hover:text-white
        transition
        hover:scale-110
      "
                      >
                        <FiCopy size={18} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(url.id)}
                        title="Delete link"
                        className="
        text-red-400
        hover:text-red-500
        transition
        hover:scale-110
      "
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
