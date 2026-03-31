"use client";

import { useMemo, useState } from "react";
import { ConversationProvider, useConversation } from "@elevenlabs/react";

interface ChatMessage {
  id: string;
  from: "user" | "bot" | "system";
  text: string;
}

const quickPrompts = [
  "Plan a 5-day Philippines island itinerary",
  "Recommend the best beaches for snorkeling",
  "Which local food should I try in Manila?",
];

function VoiceConversationInner() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "system-1",
      from: "system",
      text: "Welcome to your travel voice assistant. Tap Start to connect and speak or type a message.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    startSession,
    endSession,
    sendUserMessage,
    status,
    isMuted,
    setMuted,
    isSpeaking,
    isListening,
  } = useConversation({
    onConnect: () => {
      setError(null);
      setMessages((prev) => [
        ...prev,
        {
          id: `system-${Date.now()}`,
          from: "system",
          text: "Voice session connected. You can speak naturally or send a message.",
        },
      ]);
    },
    onDisconnect: () => {
      setMessages((prev) => [
        ...prev,
        {
          id: `system-${Date.now()}`,
          from: "system",
          text: "Session ended. Start again anytime.",
        },
      ]);
    },
    onError: (message) => {
      setError(typeof message === "string" ? message : "Conversation error.");
    },
    onMessage: (event) => {
      const text = (event as any)?.message;
      if (typeof text === "string" && text.trim()) {
        setMessages((prev) => [
          ...prev,
          { id: `bot-${Date.now()}`, from: "bot", text: text.trim() },
        ]);
      }
    },
  });

  const statusLabel = useMemo(() => {
    if (status === "connected") return "Connected";
    if (status === "connecting") return "Connecting";
    if (status === "error") return "Error";
    return "Disconnected";
  }, [status]);

  async function fetchSignedUrl() {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/convai/signed-url");
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error || response.statusText || "Failed to fetch signed URL");
      }

      const data = await response.json();
      if (!data?.signedUrl) {
        throw new Error("Signed URL missing from response.");
      }

      startSession({ signedUrl: data.signedUrl });
      setSessionStarted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start voice session.");
    } finally {
      setLoading(false);
    }
  }

  function appendMessage(message: ChatMessage) {
    setMessages((prev) => [...prev, message]);
  }

  function handleSendMessage(messageText?: string) {
    const trimmed = (messageText ?? input).trim();
    if (!trimmed) return;

    appendMessage({ id: `user-${Date.now()}`, from: "user", text: trimmed });
    setInput("");

    try {
      sendUserMessage(trimmed);
    } catch (err) {
      setError("Unable to send message. Start the voice session first.");
    }
  }

  function handlePrompt(prompt: string) {
    setInput(prompt);
    handleSendMessage(prompt);
  }

  return (
    <div className="rounded-[32px] border border-white/10 bg-[#181a20] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-sky-300/70">In-call experience</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Travel call with Myslef Lakbay</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
            Join the call and chat panel to ask questions, get recommendations, or continue the conversation by voice.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
            {statusLabel}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-200">
            {sessionStarted ? "Live call" : "Ready to connect"}
          </span>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="rounded-[32px] bg-[#202228] p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Call window</p>
              <p className="mt-1 text-sm text-zinc-400">Live voice connection with your guide.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">
                {isMuted ? "Muted" : "Mic on"}
              </span>
              <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-200">
                {isSpeaking ? "Speaking" : isListening ? "Listening" : "Idle"}
              </span>
            </div>
          </div>

          <div className="mt-6 flex min-h-[420px] flex-col items-center justify-center rounded-[32px] bg-[#14161b] p-8 text-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-sky-500/20 text-4xl text-white shadow-[0_0_0_8px_rgba(56,189,248,0.08)]">
              ✈️
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-white">Myslef Lakbay</h3>
            <p className="mt-2 text-sm text-zinc-400">Philippines travel expert</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-zinc-300">
              <span className="rounded-full bg-white/5 px-3 py-2">Call duration: 12:24</span>
              <span className="rounded-full bg-white/5 px-3 py-2">Participants: 1</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => setMuted(!isMuted)}
                className={`rounded-3xl px-4 py-3 text-sm font-semibold transition ${isMuted ? "bg-red-500 text-white" : "bg-sky-500 text-[#0f172a]"}`}
              >
                {isMuted ? "Unmute" : "Mute"}
              </button>
              <button
                type="button"
                onClick={() => fetchSignedUrl()}
                disabled={loading || sessionStarted}
                className="rounded-3xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {sessionStarted ? "Connected" : loading ? "Starting..." : "Start call"}
              </button>
              <button
                type="button"
                onClick={() => endSession()}
                disabled={!sessionStarted}
                className="rounded-3xl bg-[#db2777] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#f43f5e] disabled:cursor-not-allowed disabled:opacity-50"
              >
                End call
              </button>
            </div>
            <div className="rounded-3xl bg-white/5 px-4 py-3 text-sm text-zinc-300">
              Tip: Use the chat panel to send text while the call is active.
            </div>
          </div>
        </div>

        <div className="rounded-[32px] bg-[#17181f] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">In-call messages</p>
              <p className="mt-1 text-xs text-zinc-500">Let participants send messages</p>
            </div>
            <button className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.2em] text-zinc-200">
              Enabled
            </button>
          </div>

          <div className="mt-4 rounded-[28px] bg-[#14161b] p-5 text-sm text-zinc-400">
            <p className="font-semibold text-white">Continuous chat is turned off</p>
            <p className="mt-3">Messages will not be saved for meeting participants when the call ends.</p>
          </div>

          <div className="mt-5 h-[420px] overflow-y-auto space-y-3 pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-[24px] p-4 ${
                  message.from === "bot"
                    ? "bg-[#232530] text-zinc-100"
                    : message.from === "user"
                    ? "self-end bg-sky-500/15 text-white"
                    : "bg-[#2d2f37] text-zinc-300"
                }`}
              >
                <p className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">
                  {message.from === "bot" ? "Myslef" : message.from === "user" ? "You" : "System"}
                </p>
                <p className="mt-2 text-sm leading-6">{message.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-3">
            <div className="rounded-[24px] bg-[#121317] p-4">
              <div className="flex items-center gap-3">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Send a message"
                  className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-[#181a20] px-4 py-3 text-sm text-white outline-none focus:border-sky-400"
                />
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  className="rounded-2xl bg-sky-500 px-4 py-3 text-sm font-semibold text-[#0f172a] transition hover:bg-sky-400"
                >
                  Send
                </button>
              </div>
            </div>
            <div className="grid gap-2">
              <button
                type="button"
                onClick={() => handlePrompt(quickPrompts[0])}
                className="rounded-2xl bg-white/5 px-4 py-3 text-left text-sm text-zinc-200 hover:bg-white/10"
              >
                {quickPrompts[0]}
              </button>
              <button
                type="button"
                onClick={() => handlePrompt(quickPrompts[1])}
                className="rounded-2xl bg-white/5 px-4 py-3 text-left text-sm text-zinc-200 hover:bg-white/10"
              >
                {quickPrompts[1]}
              </button>
            </div>
          </div>
        </div>
      </div>

      {error ? (
        <div className="mt-5 rounded-[24px] bg-[#3b1f1f] p-4 text-sm text-red-300">
          {error}
        </div>
      ) : null}
    </div>
  );
}

export default function VoiceConversation() {
  return (
    <ConversationProvider>
      <VoiceConversationInner />
    </ConversationProvider>
  );
}
