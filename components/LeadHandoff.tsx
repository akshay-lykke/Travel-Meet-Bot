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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.15)] overflow-hidden">
        <div className="relative p-8 sm:p-12 text-center">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-all font-bold"
          >
            ✕
          </button>

          <div className="w-20 h-20 bg-brand-500/10 rounded-full flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">
            ✨
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Your Trip is Ready!</h2>
          <p className="text-gray-600 text-lg mb-10 max-w-md mx-auto font-medium">
            Maya has captured your preferences. Our experts are standing by to turn this into your dream itinerary.
          </p>

          <div className="bg-gray-50 rounded-3xl p-6 text-left mb-10 border border-gray-200 font-mono text-sm group shadow-inner">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Structured Data Extraction</span>
              <span className="text-[10px] uppercase tracking-widest text-brand-500 font-bold group-hover:animate-pulse">Verified</span>
            </div>
            <pre className="text-gray-700 overflow-x-auto whitespace-pre-wrap font-bold">
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
              className="px-8 py-5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-full text-lg transition-all shadow-sm active:scale-95"
            >
              Back to Chat
            </button>
          </div>
          
          <p className="mt-8 text-xs text-gray-400 italic font-bold">
            By clicking connect, you agree to share these details with the Travel Lykke sales team.
          </p>
        </div>
      </div>
    </div>
  );
}
