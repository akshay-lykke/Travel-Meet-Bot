"use client";

import Link from "next/link";
import VoiceConversation from "../../components/VoiceConversation";

export default function MeetPage() {
  return (
    <div className="min-h-screen bg-[#202124] text-white">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 rounded-3xl bg-[#303134]/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-zinc-400">Meet look</p>
            <h1 className="text-3xl font-semibold">Philippines Guide Meet</h1>
            <p className="mt-2 text-zinc-400">Mute, unmute, and talk directly to your travel expert.</p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[#8ab4f8] px-4 py-2 text-sm font-semibold text-[#202124] transition hover:bg-[#a4c8ff]"
          >
            Back home
          </Link>
        </div>

        <VoiceConversation />
      </div>
    </div>
  );
}
