"use client";

import { ConversationProvider } from "@elevenlabs/react";
import TripPlanner from "@/components/TripPlanner";
import { Compass, Sparkles, Plane, Navigation, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-brand-500/30">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Header */}
        <header className="mb-12 flex flex-col gap-4 rounded-[40px] bg-white/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-3xl sm:flex-row sm:items-center sm:justify-between border border-gray-200 animate-in slide-in-from-top-8 duration-700">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-brand-500 text-3xl shadow-lg shadow-brand-500/20 rotate-3">
              <Compass size={32} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.4em] text-brand-500 font-bold">AI Trip Planner</span>
                <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold">Travel Lykke</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Myself Maya</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end mr-4">
              <span className="text-xs font-semibold text-gray-700">Live Expert System</span>
              <span className="text-[10px] text-brand-500 font-medium">98.4% Accuracy</span>
            </div>
            <button className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 shadow-lg shadow-gray-900/10 btn-shimmer">
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
          <h2 className="text-5xl sm:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-linear-to-b from-gray-900 to-gray-500">
            Discover the best of the Philippines.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto font-medium">
            Forget about static forms. Chat with Maya, our specialist AI, to design your perfect getaway in our 7,641 beautiful islands.
          </p>
        </section>

        {/* Main Application Area */}
        <main className="flex-1">
          <ConversationProvider>
            <TripPlanner />
          </ConversationProvider>
        </main>

        {/* Footer Info */}
        <footer className="mt-20 py-12 border-t border-gray-200 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 animate-in slide-in-from-bottom-8 duration-1000">
          {[
            { icon: <Plane className="text-brand-500" />, title: "Island Hopping", desc: "No destination? Maya helps you find the perfect island based on your vibe." },
            { icon: <Navigation className="text-brand-700" />, title: "Expert Knowledge", desc: "Get real-time answers about Palawan, Boracay, Siargao and more." },
            { icon: <Globe className="text-brand-600" />, title: "Local Insights", desc: "Define your dream trip with AI, then finalize with a local travel pro." },
            { icon: <Sparkles className="text-brand-500" />, title: "Best Rates", desc: "Get exclusive Philippines island packages once your plan is ready." },
          ].map((feature, i) => (
            <div key={i} className="flex flex-col gap-4 p-6 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl group">
                {feature.icon}
              </div>
              <h3 className="font-bold text-gray-900 tracking-wide">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </footer>
        
        <div className="mt-12 mb-6 text-center">
           <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 font-bold">
             Powered by ElevenLabs & Gemini 2.0 Flash
           </p>
        </div>
      </div>
    </div>
  );
}
