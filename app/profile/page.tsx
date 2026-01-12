import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import SignOutButton from "@/components/sign-out-button";

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
  const activeLinks = urls.filter(url => !url.expiresAt || new Date() < url.expiresAt).length;
  const expiredLinks = urls.filter(url => url.expiresAt && new Date() > url.expiresAt).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold cursor-pointer">TinyLink</h1>
          </Link>
          <SignOutButton />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-4">
            {session.user.image && (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-16 h-16 rounded-full"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold">{session.user.name}</h2>
              <p className="text-gray-600">{session.user.email}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Links</p>
            <p className="text-3xl font-bold">{urls.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Clicks</p>
            <p className="text-3xl font-bold">{totalClicks}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Active / Expired</p>
            <p className="text-3xl font-bold">
              {activeLinks} / {expiredLinks}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold">Your Links</h3>
          </div>
          
          {urls.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600 mb-4">No links yet</p>
              <Link href="/">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Create Your First Link
                </button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Short Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Original URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Clicks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Expires
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {urls.map((url) => {
                    const isExpired = url.expiresAt && new Date() > url.expiresAt;
                    return (
                      <tr key={url.id} className={isExpired ? "bg-gray-50" : ""}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                              {url.shortCode}
                            </code>
                            {url.customCode && (
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
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
                            className="text-blue-600 hover:underline text-sm truncate block max-w-xs"
                          >
                            {url.originalUrl}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          {url.clickCount}
                        </td>
                        <td className="px-6 py-4">
                          {isExpired ? (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                              Expired
                            </span>
                          ) : (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                              Active
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {url.expiresAt ? new Date(url.expiresAt).toLocaleDateString() : "Never"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
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