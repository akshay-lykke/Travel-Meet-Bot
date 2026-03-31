"use client";

import LeadHandoff from "@/components/LeadHandoff";
import SummaryCard from "@/components/SummaryCard";
import { TripDetails } from "@/lib/types";
import { useConversation } from "@elevenlabs/react";
import { Info, MessageSquare, Mic, MicOff, PhoneOff, Send, Sparkles, Video } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

interface ChatMessage {
  id: string;
  from: "user" | "bot" | "system";
  text: string;
}

export default function TripPlanner() {
  const [mode, setMode] = useState<"chat" | "video">("video");
  const [details, setDetails] = useState<TripDetails>({
    destination: "",
    budget: "",
    duration: "",
    travelers: "",
    preferences: [],
  });
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isFinalized, setIsFinalized] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  // Client Tools Handlers
  const clientTools = useMemo(() => ({
    update_trip_details: async (newDetails: Partial<TripDetails>) => {
      console.log("Updating trip details:", newDetails);
      setIsCapturing(true);
      setDetails(prev => ({
        ...prev,
        ...newDetails,
        preferences: newDetails.preferences
          ? Array.from(new Set([...(prev.preferences || []), ...newDetails.preferences]))
          : prev.preferences
      }));
      setTimeout(() => setIsCapturing(false), 2000);
      return "Details updated";
    },
    finalize_trip: async ({ summary }: { summary: string }) => {
      console.log("Finalizing trip:", summary);
      setIsFinalized(true);
      return "Trip finalized: " + summary;
    }
  }), []);

  const {
    startSession,
    endSession,
    sendUserMessage,
    status,
    isMuted,
    setMuted,
    isSpeaking,
  } = useConversation({
    onConnect: () => {
      setMessages([{ id: "sys-1", from: "system", text: "Connected to Maya. You can start speaking now!" }]);
    },
    onDisconnect: () => {
      setMessages(prev => [...prev, { id: `sys-${Date.now()}`, from: "system", text: "Session ended." }]);
    },
    onMessage: (event: { message: string }) => {
      if (event.message) {
        setMessages(prev => [...prev, { id: `bot-${Date.now()}`, from: "bot", text: event.message }]);
      }
    },
    onError: (error) => {
      console.error("Conversation error:", error);
    },
    clientTools
  });

  const handleStartCall = useCallback(async () => {
    try {
      await startSession({
        agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID,
      });
    } catch (error) {
      console.error("Failed to start session:", error);
      alert("Failed to connect. Please check your Agent ID and try again.");
    }
  }, [startSession]);

  const handleSendMessage = useCallback(async () => {
    if (!inputText.trim() || status !== "connected") return;

    const userMsg = inputText;
    setInputText("");
    setMessages(prev => [...prev, { id: `user-${Date.now()}`, from: "user", text: userMsg }]);

    try {
      await sendUserMessage(userMsg);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }, [inputText, status, sendUserMessage]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20 animate-in fade-in zoom-in duration-700">

      {/* Interaction Mode Toggle */}
      <div className="lg:col-span-12 flex justify-center mb-4">
        <div className="bg-white border border-gray-200 p-1.5 rounded-2xl flex gap-1 shadow-md">
          <button
            onClick={() => setMode("video")}
            className={`px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 font-semibold text-sm ${mode === "video" ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20" : "text-gray-500 hover:text-gray-900"}`}
          >
            <Video size={16} />
            Live Session
          </button>
          <button
            onClick={() => setMode("chat")}
            className={`px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 font-semibold text-sm ${mode === "chat" ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20" : "text-gray-500 hover:text-gray-900"}`}
          >
            <MessageSquare size={16} />
            Messenger
          </button>
        </div>
      </div>

      {/* Main Interaction Area */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <div className="relative aspect-video lg:aspect-[16/9] rounded-[40px] bg-white border border-gray-200 overflow-hidden shadow-xl flex items-center justify-center group">
          
          {/* Subtle Video Background Grid */}
          <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]"></div>

          {mode === "video" ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-8">
              {/* AI Avatar / Pulse */}
              <div className="relative mb-10">
                <div className={`absolute inset-0 rounded-full bg-brand-500/10 animate-pulse-soft blur-3xl transition-opacity duration-1000 ${status === "connected" ? "opacity-100" : "opacity-0"}`}></div>
                <div className={`w-36 h-36 rounded-full bg-linear-to-br from-brand-300 to-brand-700 flex items-center justify-center text-5xl shadow-2xl relative z-10 border-4 border-white transform transition-all duration-700 ${isSpeaking ? "scale-110 shadow-brand-500/20" : "scale-100"}`}>
                  <Sparkles size={48} className="text-white animate-pulse" />
                </div>
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Maya is ready</h2>
                <p className="text-gray-500 mb-10 max-w-xs mx-auto font-medium">
                  {status === "connected" ? "Listening and speaking..." : "Start a call to begin your planning session"}
                </p>

                <div className="flex gap-4 justify-center">
                  {status !== "connected" ? (
                    <button
                      onClick={handleStartCall}
                      className="px-10 py-5 bg-brand-500 hover:bg-brand-700 text-white font-bold rounded-full text-lg shadow-xl shadow-brand-500/20 transition-all flex items-center gap-3 btn-shimmer active:scale-95"
                    >
                      Start Call
                    </button>
                  ) : (
                    <button
                      onClick={endSession}
                      className="px-10 py-5 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white font-bold rounded-full text-lg border border-red-200 transition-all flex items-center gap-3 active:scale-95"
                    >
                      <PhoneOff size={24} />
                      End Session
                    </button>
                  )}
                </div>
              </div>

              {/* Status Indicators */}
              {status === "connected" && (
                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center px-4 animate-in slide-in-from-bottom-4 duration-700">
                  <div className="flex items-center gap-3 bg-gray-50/80 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200">
                    <div className="flex gap-1 h-4 items-center">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className={`w-1 rounded-full bg-brand-500 transition-all duration-150 ${isSpeaking ? "h-6 animate-pulse" : "h-2"}`} style={{ animationDelay: `${i * 100}ms` }}></div>
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{isSpeaking ? "Maya is speaking" : "Maya is listening"}</span>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => setMuted(!isMuted)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isMuted ? "bg-red-500 text-white shadow-lg shadow-red-500/20" : "bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm"}`}>
                      {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full flex flex-col text-left">
              <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide bg-gray-50/50">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}>
                    <div className={`max-w-[80%] px-6 py-4 rounded-[30px] font-semibold ${m.from === "user" ? "bg-brand-500 text-white rounded-br-none shadow-lg shadow-brand-500/10" : m.from === "bot" ? "bg-white border border-gray-100 text-gray-800 rounded-bl-none shadow-sm" : "bg-gray-200/50 text-gray-500 text-xs italic text-center w-full shadow-none"}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-8 pt-4 mt-auto border-t border-gray-100 bg-white">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask Maya about Philippine destination ideas..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-5 pl-8 pr-16 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-brand-500/30 focus:bg-white transition-all text-lg shadow-inner"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={status !== "connected"}
                    className="absolute right-4 w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center text-white hover:bg-brand-700 transition-all disabled:opacity-50 disabled:grayscale shadow-md active:scale-95"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI Info Overlay - Philippines Experiences */}
        <div className="flex flex-col gap-4 px-6 py-5 bg-white border border-gray-200 rounded-[32px] shadow-sm">
          <div className="flex items-center gap-4 text-gray-600 text-sm">
            <Info size={16} className="text-brand-500" />
            <span className="font-semibold text-gray-800">Expertise: Manila, Boracay, Cebu, El Nido, Siargao</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Island Hopping", "Whale Sharks (Oslob)", "Yacht Party", "Kawasan Falls", "Moalboal Diving"].map((exp) => (
              <span key={exp} className="px-3 py-1 rounded-full bg-brand-50 text-[10px] font-bold text-brand-500 uppercase tracking-wider">{exp}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar Summary Area */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <SummaryCard details={details} isCapturing={isCapturing} />

        <div className="rounded-[32px] bg-brand-50/50 border border-brand-100/50 p-6 backdrop-blur-md">
          <h4 className="text-gray-900 font-bold mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center text-xs text-brand-500">AI</span>
            How Maya works
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed font-medium">
            Maya is a specialist in Philippines travel. She extracts your intent while you chat and helps you discover the perfect islands.
          </p>
        </div>
      </div>

      {/* Lead Handoff Modal */}
      {isFinalized && (
        <LeadHandoff
          details={details}
          onClose={() => setIsFinalized(false)}
        />
      )}
    </div>
  );
}
