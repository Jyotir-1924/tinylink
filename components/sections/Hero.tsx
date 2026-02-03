import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="w-full min-h-[70vh] flex items-center">
      <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl text-white">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center">
          Create powerful
          <br className="sm:hidden" />
          <span className="gradient-text"> short links</span>
          <br />
          in seconds
        </h1>

        <p className="text-sm sm:text-base md:text-lg mb-8 text-white/80">
          TinyLink helps you shorten, manage, and share links with custom
          aliases and expiration control.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/create">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-black hover:bg-white/90"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
