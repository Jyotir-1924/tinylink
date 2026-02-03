export default function Features() {
  const features = [
    {
      title: "Custom Short Links",
      description:
        "Create branded links with your own custom codes instead of random strings.",
    },
    {
      title: "Expiration Control",
      description:
        "Set expiry dates so links automatically deactivate when no longer needed.",
    },
    {
      title: "Secure Accounts",
      description:
        "Sign in with Google or email and manage all your links in one place.",
    },
    {
      title: "Fast & Reliable",
      description: "Lightning-fast redirects with a modern, scalable backend.",
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 text-white whitespace-nowrap">
          Why use <span className="gradient-text">TinyLink</span>?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10
                         hover:border-white/20 transition shadow-[0_0_30px_rgba(0,255,180,0.08)]"
            >
              <h3 className="text-lg font-semibold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
