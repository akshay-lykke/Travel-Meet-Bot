"use client";

import Link from "next/link";
import { useState } from "react";

export default function MeetPage() {
  const [muted, setMuted] = useState(false);
  const [input, setInput] = useState("");
  const [realUserConnected, setRealUserConnected] = useState(false);
  const connectionMode = realUserConnected ? "Live traveler" : "AI travel guide";
  const connectionSubtitle = realUserConnected
    ? "You’re talking to a live traveler who knows the Philippines."
    : "You’re talking to your AI travel expert.";
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "bot",
      text: "Hi there! I’m Myslef Lakbay, your Philippines travel expert. Ask me anything about the Philippines and I’ll help you out.",
    },
  ]);

  function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, from: "user", text: trimmed },
      {
        id: prev.length + 2,
        from: "bot",
        text: `Great idea! I can help with that. Tell me more about what you want in the Philippines: beaches, islands, food, or nightlife?`,
      },
    ]);
    setInput("");
  }

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

        <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-[32px] bg-[#303134] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
              <div className="relative aspect-video overflow-hidden rounded-[28px] bg-[#1f1f23]">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
                  <div>
                    <div className="wave-bars mx-auto mt-5 max-w-[160px]">
                      <span className="wave-bar"></span>
                      <span className="wave-bar"></span>
                      <span className="wave-bar"></span>
                      <span className="wave-bar"></span>
                      <span className="wave-bar"></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-4 rounded-3xl bg-[#232528] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-zinc-400">Microphone</p>
                  <p className="mt-1 text-lg font-semibold text-white">{muted ? "Muted" : "Live"}</p>
                </div>
                <button
                  onClick={() => setMuted((prev) => !prev)}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition ${muted ? "bg-red-500 text-white" : "bg-[#8ab4f8] text-[#202124]"}`}
                >
                  {muted ? "Unmute" : "Mute"}
                </button>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[32px] bg-[#303134] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-zinc-400">Live chat</p>
                  <h3 className="text-xl font-semibold">Talk to your {connectionMode}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{connectionSubtitle}</p>
                </div>
                <span className="rounded-full bg-[#5f6368] px-3 py-1 text-xs uppercase tracking-[0.18em] text-zinc-200">
                  {muted ? "Mic muted" : "Mic on"}
                </span>
              </div>

              <div className="mt-6 flex max-h-[360px] flex-col gap-3 overflow-y-auto pr-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`rounded-3xl p-4 ${message.from === "bot" ? "bg-[#232528] text-zinc-300" : "self-end rounded-br-none bg-[#8ab4f8]/20 text-white"}`}
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                      {message.from === "bot" ? "Philippines Guide" : "You"}
                    </p>
                    <p className="mt-2 break-words">{message.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Type your question here"
                  className="min-w-0 flex-1 rounded-3xl border border-[#444650] bg-[#1f1f23] px-4 py-3 text-sm text-white outline-none transition focus:border-[#8ab4f8]"
                />
                <button
                  onClick={sendMessage}
                  className="rounded-3xl bg-[#8ab4f8] px-6 py-3 text-sm font-semibold text-[#202124] transition hover:bg-[#a4c8ff]"
                >
                  Send
                </button>
              </div>
            </div>

            <div className="rounded-[32px] bg-[#303134] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-zinc-400">Real user</p>
                  <h3 className="text-xl font-semibold">Connect with a traveler</h3>
                </div>
              </div>
              <p className="mt-4 text-sm text-zinc-300">
                Chat with a real Philippines traveler for live tips, local secrets, and on-the-ground advice.
              </p>
              <button
                onClick={() => setRealUserConnected(true)}
                className="mt-5 inline-flex items-center justify-center rounded-3xl bg-[#8ab4f8] px-5 py-3 text-sm font-semibold text-[#202124] transition hover:bg-[#a4c8ff]"
              >
                {realUserConnected ? "Connected with Nyoman" : "Connect with real user"}
              </button>
              {realUserConnected && (
                <p className="mt-3 rounded-3xl bg-[#232528] p-4 text-sm text-zinc-300">
                  You’re now connected to a live traveler. Ask anything Philippines-related and get real local insight.
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
