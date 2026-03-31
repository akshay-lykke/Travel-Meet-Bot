import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#202124] text-white font-sans">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col gap-4 rounded-3xl bg-[#303134]/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#5f6368] text-xl">🎥</div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">Meet</p>
              <h1 className="text-2xl font-semibold">Myslef Lakbay</h1>
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl bg-[#3c4043] p-3 text-sm text-zinc-300 sm:flex-row sm:items-center">
            <span className="font-medium text-white">I’m a Philippines travel expert</span>
            <span className="rounded-full bg-[#5f6368] px-3 py-1 text-xs uppercase tracking-[0.18em] text-zinc-300">
              Talk or chat freely
            </span>
          </div>
        </header>

        <main className="grid flex-1 gap-6 lg:grid-cols-[1.8fr_1fr]">
          <section className="rounded-[32px] bg-[#303134] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-zinc-400">Active call</p>
                <h2 className="text-3xl font-semibold">Live travel briefing</h2>
              </div>
              <div className="rounded-2xl bg-[#43474f] px-3 py-2 text-sm text-zinc-200">
                12:24 PM • 7 participants
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
              <div className="rounded-[28px] bg-[#202124] p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#8ab4f8] text-4xl">✈️</div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-zinc-400">Mascot</p>
                    <h3 className="text-2xl font-semibold">Travel Enthusiast</h3>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="rounded-3xl bg-[#3c4043] p-4 text-sm text-zinc-200">
                    "Ready to explore the Philippines? I’ve got the perfect itinerary."
                  </div>
                  <div className="rounded-3xl bg-[#43474f] p-4 text-sm text-zinc-200">
                    "Pack your bags — today’s highlight is a sunrise volcano trek."
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] bg-[#202124] p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Call preview</h3>
                  <span className="rounded-full bg-[#8ab4f8]/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#8ab4f8]">
                    Live
                  </span>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-3xl bg-[#323438] p-4">
                    <p className="text-sm text-zinc-400">Destination</p>
                    <p className="mt-2 text-lg font-semibold">Philippines</p>
                  </div>
                  <div className="rounded-3xl bg-[#323438] p-4">
                    <p className="text-sm text-zinc-400">Mood</p>
                    <p className="mt-2 text-lg font-semibold">Adventure + Relaxation</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { name: "Mia", status: "On mic" },
                { name: "Kai", status: "Ready" },
                { name: "Noah", status: "Off" },
                { name: "Ava", status: "Ready" },
              ].map((participant) => (
                <div
                  key={participant.name}
                  className="rounded-3xl bg-[#2c2f33] p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-[#5f6368] flex-none" />
                    <div>
                      <p className="text-base font-semibold">{participant.name}</p>
                      <p className="text-sm text-zinc-500">{participant.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 rounded-[32px] bg-[#323438] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-zinc-400">Mascot prompt</p>
                <p className="mt-2 text-lg font-medium">"Plan a weekend trip from Paris to Lisbon."</p>
              </div>
              <Link href="/meet" className="inline-flex items-center justify-center rounded-full bg-[#8ab4f8] px-5 py-3 text-sm font-semibold text-[#202124] transition hover:bg-[#a4c8ff]">
                Start call
              </Link>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[32px] bg-[#303134] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
              <p className="text-sm uppercase tracking-[0.24em] text-zinc-400">Travel assistant</p>
              <h3 className="mt-3 text-xl font-semibold">Milo the Mascot</h3>
              <p className="mt-4 text-sm leading-6 text-zinc-300">
                Feel free to talk to me about any destination — I’ll help you plan it, chat ideas, or talk through your next Philippines adventure.
              </p>
              <div className="mt-6 grid gap-3">
                <div className="rounded-3xl bg-[#232528] p-4">
                  <p className="text-sm text-zinc-400">Next idea</p>
                  <p className="mt-2 font-semibold">Sunrise volcano hike</p>
                </div>
                <div className="rounded-3xl bg-[#232528] p-4">
                  <p className="text-sm text-zinc-400">Local tip</p>
                  <p className="mt-2 font-semibold">Beach cafes with live music</p>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] bg-[#303134] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-zinc-400">Travel stats</p>
                  <h3 className="text-xl font-semibold">Call insights</h3>
                </div>
                <div className="rounded-full bg-[#5f6368] px-3 py-1 text-xs uppercase tracking-[0.18em] text-zinc-200">Live</div>
              </div>
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between rounded-3xl bg-[#232528] p-4">
                  <span className="text-sm text-zinc-400">Destinations</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-[#232528] p-4">
                  <span className="text-sm text-zinc-400">Suggestions</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex items-center justify-between rounded-3xl bg-[#232528] p-4">
                  <span className="text-sm text-zinc-400">Confidence</span>
                  <span className="font-semibold">97%</span>
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
