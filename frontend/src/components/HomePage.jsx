import React from "react";

const HomePage = ({ onNavigate }) => {
  return (
    <div className="w-full text-gray-200 bg-gradient-to-b from-[#0b0f1a] via-[#0e1222] to-[#0b0f1a]">

      {/* HERO */}
      <section
        className="h-screen flex items-center justify-center px-6 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        <div className="relative z-10 text-center max-w-3xl bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Find a Home That Feels Right
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Thoughtfully designed homes that fit your lifestyle, budget,
            and future — without the stress.
          </p>

          <div className="flex justify-center gap-6">
            <button
              onClick={() => onNavigate("our-project")}
              className="px-8 py-3 bg-indigo-600 rounded-xl hover:bg-indigo-500 transition"
            >
              View Properties
            </button>
            <button
              onClick={() => onNavigate("enquiry-form")}
              className="px-8 py-3 border border-white/30 rounded-xl hover:bg-white/10 transition"
            >
              Enquire
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="h-screen flex flex-col justify-center items-center">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
          {[
            {
              icon: "🏡",
              title: "Premium Homes",
              desc: "Curated properties in prime and peaceful locations.",
            },
            {
              icon: "💰",
              title: "Transparent Pricing",
              desc: "Clear costs, no surprises, full confidence.",
            },
            {
              icon: "🤝",
              title: "Trusted Guidance",
              desc: "We stay with you from visit to keys-in-hand.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl hover:border-indigo-500/50 transition"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-semibold mb-2 text-white">
                {item.title}
              </h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-12 backdrop-blur-xl">
          <h2 className="text-4xl font-bold mb-4">
            Plan Your EMI Comfortably
          </h2>
          <p className="text-gray-400 mb-8">
            Know your monthly commitment before making a big decision.
          </p>
          <button
            onClick={() => onNavigate("calculator")}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl"
          >
            Calculate EMI
          </button>
        </div>
      </section>

      {/* EMI SECTION
      <section className="h-screen flex items-center justify-center text-center px-6">
        <div className="max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-12 backdrop-blur-xl">
          <h2 className="text-4xl font-bold mb-4">
            Plan Your EMI Comfortably
          </h2>
          <p className="text-gray-400 mb-8">
            Know your monthly commitment before making a big decision.
          </p>
          <button
            onClick={() => onNavigate("calculator")}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl"
          >
            Calculate EMI
          </button>
        </div>
      </section> */}

      {/* FINAL CTA
      <section className="h-screen flex items-center justify-center text-center px-6">
        <div className="max-w-xl bg-white/5 border border-white/10 rounded-3xl p-12 backdrop-blur-xl">
          <h2 className="text-4xl font-bold mb-4">
            Let’s Talk About Your New Home
          </h2>
          <p className="text-gray-400 mb-8">
            One simple enquiry is all it takes to get started.
          </p>
          <button
            onClick={() => onNavigate("enquiry-form")}
            className="px-8 py-4 bg-indigo-600 rounded-xl hover:bg-indigo-500 transition"
          >
            Enquire Now
          </button>
        </div>
      </section> */}

    </div>
  );
};

export default HomePage;
