import Image from "next/image";
import SignOutButton from "@/components/ui/sign-out-button";

export default function ProfileCard({ user }: { user: any }) {
  return (
    <div className="w-full rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(0,255,180,0.12)] mb-10">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "User"}
            width={96}
            height={96}
            className="rounded-full ring-2 ring-white/30 object-cover shadow-[0_0_20px_rgba(255,255,255,0.25)]"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center ring-2 ring-white/30">
            <span className="text-white text-3xl font-bold">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
        )}
        
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-3xl font-bold text-white mb-1">{user.name}</h2>
          <p className="text-white/60">{user.email}</p>
        </div>

        <SignOutButton />
      </div>
    </div>
  );
}
