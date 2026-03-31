"use client";

import { TripDetails } from "@/lib/types";

interface SummaryCardProps {
  details: TripDetails;
  isCapturing?: boolean;
}

export default function SummaryCard({ details, isCapturing }: SummaryCardProps) {
  const hasData = details.destination || details.budget || details.duration || details.travelers || (details.preferences && details.preferences.length > 0);

  return (
    <div className="rounded-[32px] bg-gray-900 border border-white/5 p-6 backdrop-blur-md shadow-2xl transition-all duration-500 hover:shadow-brand-500/10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-brand-500 font-bold">Live Discovery</p>
          <h3 className="text-xl font-semibold text-white mt-1">Trip Summary</h3>
        </div>
        {isCapturing && (
          <div className="flex items-center gap-2">
             <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-brand-500 font-medium">Capturing</span>
          </div>
        )}
      </div>

      {!hasData ? (
        <div className="py-12 text-center text-zinc-600">
          <div className="text-4xl mb-4 opacity-20">🕊️</div>
          <p className="text-sm italic">Sharing your ideas with Maya will reveal your plan here...</p>
        </div>
      ) : (
        <div className="space-y-5">
          {details.destination && (
            <div className="group">
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 group-hover:text-brand-500 transition-colors">Destination</p>
              <p className="text-lg font-medium text-white">{details.destination}</p>
            </div>
          )}

          {details.budget && (
            <div className="group">
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 group-hover:text-brand-500 transition-colors">Budget Range</p>
              <p className="text-lg font-medium text-white">{details.budget}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {details.duration && (
              <div className="group">
                <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 group-hover:text-brand-500 transition-colors">Duration</p>
                <p className="text-base font-medium text-white">{details.duration}</p>
              </div>
            )}
            {details.travelers && (
              <div className="group">
                <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1 group-hover:text-brand-500 transition-colors">Travelers</p>
                <p className="text-base font-medium text-white">{details.travelers}</p>
              </div>
            )}
          </div>

          {details.preferences && details.preferences.length > 0 && (
            <div className="group">
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-2 group-hover:text-brand-500 transition-colors">Preferences</p>
              <div className="flex flex-wrap gap-2">
                {details.preferences.map((pref: string, i: number) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-zinc-300 hover:bg-brand-500/10 hover:border-brand-500/30 hover:text-brand-500 transition-all cursor-default"
                  >
                    {pref}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
         <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
               <div key={i} className="w-6 h-6 rounded-full border-2 border-gray-900 bg-zinc-700 flex items-center justify-center text-[8px] font-bold text-white">
                  {String.fromCharCode(64 + i)}
               </div>
            ))}
            <div className="w-6 h-6 rounded-full border-2 border-gray-900 bg-brand-500 flex items-center justify-center text-[10px] font-bold text-white">+</div>
         </div>
         <p className="text-[10px] text-zinc-500 font-medium italic">Shared with Travel Lykke Team</p>
      </div>
    </div>
  );
}
