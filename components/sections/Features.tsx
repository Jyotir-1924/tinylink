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
        "Set expiry dates for links so they automatically deactivate when no longer needed.",
    },
    {
      title: "Click Analytics",
      description:
        "Track how many times each short link has been clicked in real time.",
    },
    {
      title: "Secure Accounts",
      description:
        "Sign in with Google or email and manage all your links in one secure dashboard.",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why use <span className="">TinyLink</span>?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl shadow-md bg-black hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
