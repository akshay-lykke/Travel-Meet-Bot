"use client";

import { TripDetails } from "@/lib/types";

interface LeadHandoffProps {
  details: TripDetails;
  onClose: () => void;
}

export default function LeadHandoff({ details, onClose }: LeadHandoffProps) {
  const jsonSummary = JSON.stringify(details, null, 2);

  const handleConnect = () => {
    alert("Wonderful! A Travel Lykke expert will reach out to you shortly with a personalized itinerary.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/90 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="w-full max-w-2xl bg-gray-900 border border-white/10 rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.6)] overflow-hidden">
        <div className="relative p-8 sm:p-12 text-center">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 transition-all"
          >
            ✕
          </button>

          <div className="w-20 h-20 bg-brand-500/20 rounded-full flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">
            ✨
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Your Trip is Ready!</h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-md mx-auto">
            Maya has captured your preferences. Our experts are standing by to turn this into your dream itinerary.
          </p>

          <div className="bg-gray-950 rounded-3xl p-6 text-left mb-10 border border-white/5 font-mono text-sm group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Structured Data Extraction</span>
              <span className="text-[10px] uppercase tracking-widest text-brand-500 font-bold group-hover:animate-pulse">Verified</span>
            </div>
            <pre className="text-brand-500 overflow-x-auto whitespace-pre-wrap">
              {jsonSummary}
            </pre>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleConnect}
              className="px-10 py-5 bg-brand-500 hover:bg-brand-700 text-white font-bold rounded-full text-lg shadow-lg shadow-brand-500/20 transition-all hover:scale-105 active:scale-95 btn-shimmer"
            >
              Connect with Travel Expert
            </button>
            <button 
              onClick={onClose}
              className="px-8 py-5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full text-lg transition-all"
            >
              Back to Chat
            </button>
          </div>
          
          <p className="mt-8 text-xs text-zinc-500 italic">
            By clicking connect, you agree to share these details with the Travel Lykke sales team.
          </p>
        </div>
      </div>
    </div>
  );
}
