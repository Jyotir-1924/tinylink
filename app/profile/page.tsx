import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

import ProfileCard from "@/components/profile/ProfileCard";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileLinksTable from "@/components/profile/ProfileLinksTable";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/");

  const urls = await prisma.url.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  const totalClicks = urls.reduce((s, u) => s + u.clickCount, 0);
  const active = urls.filter(
    (u) => !u.expiresAt || new Date() < u.expiresAt
  ).length;
  const expired = urls.length - active;

  return (
    <main className="min-h-screen app-bg flex items-center px-6">
      <div className="w-full max-w-7xl mx-auto mt-14">
        <ProfileCard user={session.user} />

        <ProfileStats
          total={urls.length}
          active={active}
          expired={expired}
          clicks={totalClicks}
        />

        <ProfileLinksTable urls={urls} />
      </div>
    </main>
  );
}
