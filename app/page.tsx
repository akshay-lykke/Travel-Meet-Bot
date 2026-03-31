"use client";

import { ConversationProvider } from "@elevenlabs/react";
import TripPlanner from "@/components/TripPlanner";
import { Compass, Sparkles, Plane, Navigation, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-brand-500/30">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Header */}
        <header className="mb-12 flex flex-col gap-4 rounded-[40px] bg-gray-900/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-3xl sm:flex-row sm:items-center sm:justify-between border border-white/5 animate-in slide-in-from-top-8 duration-700">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-brand-500 text-3xl shadow-lg shadow-brand-500/20 rotate-3">
              <Compass size={32} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.4em] text-brand-500 font-bold">AI Trip Planner</span>
                <span className="h-1 w-1 rounded-full bg-zinc-600"></span>
                <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">Travel Lykke</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white">Myself Maya</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end mr-4">
              <span className="text-xs font-semibold text-zinc-300">Live Expert System</span>
              <span className="text-[10px] text-brand-500 font-medium">98.4% Accuracy</span>
            </div>
            <button className="rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20 border border-white/10 btn-shimmer">
              Dashboard
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="mb-16 text-center max-w-3xl mx-auto animate-in fade-in duration-1000 delay-200">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-500 text-xs font-bold uppercase tracking-widest mb-8">
            <Sparkles size={14} />
            Experimental AI Discovery
          </div>
          <h2 className="text-5xl sm:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-linear-to-b from-white to-zinc-500">
            Let&apos;s plan your next holiday together.
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Forget about static forms. Chat or talk with Maya, our AI travel expert, to design your perfect getaway in real-time.
          </p>
        </section>

        {/* Main Application Area */}
        <main className="flex-1">
          <ConversationProvider>
            <TripPlanner />
          </ConversationProvider>
        </main>

        {/* Footer Info */}
        <footer className="mt-20 py-12 border-t border-white/5 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 animate-in slide-in-from-bottom-8 duration-1000">
          {[
            { icon: <Plane className="text-brand-500" />, title: "Discovery Mode", desc: "No destination? Maya helps you find the perfect spot based on your mood." },
            { icon: <Navigation className="text-brand-300" />, title: "Live Updates", desc: "Watch your trip summary build itself as you talk through your ideas." },
            { icon: <Globe className="text-brand-400" />, title: "Expert Handoff", desc: "Define the vision with AI, then finalize the details with a human travel pro." },
            { icon: <Sparkles className="text-brand-200" />, title: "Premium Pricing", desc: "Get exclusive Travel Lykke rates and packages once your plan is ready." },
          ].map((feature, i) => (
            <div key={i} className="flex flex-col gap-4 p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-all hover:bg-white/[0.07]">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl">
                {feature.icon}
              </div>
              <h3 className="font-bold text-white tracking-wide">{feature.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </footer>
        
        <div className="mt-12 mb-6 text-center">
           <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-600 font-bold">
             Powered by ElevenLabs & Gemini 2.0 Flash
           </p>
        </div>
      </div>
    </div>
  );
}
