import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="w-full min-h-[70vh] flex items-center">
      <div className="container mx-auto px-6 text-center max-w-4xl text-white">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 ">
          Create powerful
          <span className="gradient-text"> short links</span>
          <br />
          in seconds
        </h1>

        <p className="text-lg mb-10">
          TinyLink helps you shorten, track, and manage your links with custom
          aliases, expiry dates, and real-time analytics.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/create">
            <Button size="lg" variant="ghost" className="bg-accent-foreground">
              Get Started
            </Button>
          </Link>

          <Link href="/statistics">
            <Button size="lg" variant="ghost" className="bg-accent-foreground">
              View Stats
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
