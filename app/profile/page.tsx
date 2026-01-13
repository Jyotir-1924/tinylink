import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import SignOutButton from "@/components/sign-out-button";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  const urls = await prisma.url.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalClicks = urls.reduce((sum, url) => sum + url.clickCount, 0);

  const activeLinks = urls.filter(
    (url) => !url.expiresAt || new Date() < url.expiresAt
  ).length;

  const expiredLinks = urls.filter(
    (url) => url.expiresAt && new Date() > url.expiresAt
  ).length;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold cursor-pointer bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TinyLink
            </h1>
          </Link>
          <SignOutButton />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-24 h-24 rounded-full ring-4 ring-blue-100"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-500 to-indigo-500 flex items-center justify-center ring-4 ring-blue-100">
                  <span className="text-white text-3xl font-bold">
                    {session.user.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
            </div>

            <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl font-bold mb-1">{session.user.name}</h2>
              <p className="text-gray-600 mb-4">{session.user.email}</p>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {urls.length} Total Links
                </span>
                <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {activeLinks} Active
                </span>
                <span className="px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  {totalClicks} Total Clicks
                </span>
              </div>
            </div>

            <Link href="/">
              <Button className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Create New Link
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm font-medium mb-2">
              Total Links
            </p>
            <p className="text-4xl font-bold text-gray-800">{urls.length}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <p className="text-gray-600 text-sm font-medium mb-2">
              Active Links
            </p>
            <p className="text-4xl font-bold text-gray-800">{activeLinks}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <p className="text-gray-600 text-sm font-medium mb-2">
              Total Clicks
            </p>
            <p className="text-4xl font-bold text-gray-800">{totalClicks}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <p className="text-gray-600 text-sm font-medium mb-2">Expired</p>
            <p className="text-4xl font-bold text-gray-800">{expiredLinks}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b bg-linear-to-r from-blue-50 to-indigo-50">
            <h3 className="text-2xl font-bold">Your Links</h3>
          </div>

          {urls.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </div>
              <p className="text-gray-600 mb-4 text-lg">No links yet</p>
              <Link href="/">
                <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-medium">
                  Create Your First Link
                </button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Short Code
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Original URL
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Clicks
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Expires
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {urls.map((url) => {
                    const isExpired =
                      url.expiresAt && new Date() > url.expiresAt;
                    return (
                      <tr
                        key={url.id}
                        className={`hover:bg-gray-50 transition-colors ${
                          isExpired ? "opacity-60" : ""
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <code className="text-sm font-mono bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-semibold">
                              {url.shortCode}
                            </code>
                            {url.customCode && (
                              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded font-medium">
                                Custom
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={url.originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline text-sm truncate block max-w-xs font-medium"
                          >
                            {url.originalUrl}
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-indigo-500 text-white font-bold">
                            {url.clickCount}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {isExpired ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                              <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                              Expired
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                              Active
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                          {url.expiresAt
                            ? new Date(url.expiresAt).toLocaleDateString()
                            : "Never"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                          {new Date(url.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
