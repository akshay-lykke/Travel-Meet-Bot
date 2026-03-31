"use client";

import { TripDetails } from "@/lib/types";

interface SummaryCardProps {
  details: TripDetails;
  isCapturing?: boolean;
}

export default function SummaryCard({ details, isCapturing }: SummaryCardProps) {
  const hasData = details.destination || details.budget || details.duration || details.travelers || (details.preferences && details.preferences.length > 0);

  return (
    <div className="rounded-[32px] bg-white border border-gray-200 p-6 shadow-xl transition-all duration-500 hover:shadow-brand-500/5 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-brand-500 font-bold">Live Discovery</p>
          <h3 className="text-xl font-bold text-gray-900 mt-1">Trip Summary</h3>
        </div>
        {isCapturing && (
          <div className="flex items-center gap-2">
             <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-brand-500 font-bold">Capturing</span>
          </div>
        )}
      </div>

      {!hasData ? (
        <div className="py-12 text-center text-gray-400">
          <div className="text-4xl mb-4 opacity-50">🕊️</div>
          <p className="text-sm italic font-medium">Sharing your ideas with Maya will reveal your plan here...</p>
        </div>
      ) : (
        <div className="space-y-5">
          {details.destination && (
            <div className="group">
              <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1 group-hover:text-brand-500 transition-colors font-bold">Destination</p>
              <p className="text-lg font-bold text-gray-900">{details.destination}</p>
            </div>
          )}

          {details.budget && (
            <div className="group">
              <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1 group-hover:text-brand-500 transition-colors font-bold">Budget Range</p>
              <p className="text-lg font-bold text-gray-900">{details.budget}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {details.duration && (
              <div className="group">
                <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1 group-hover:text-brand-500 transition-colors font-bold">Duration</p>
                <p className="text-base font-bold text-gray-900">{details.duration}</p>
              </div>
            )}
            {details.travelers && (
              <div className="group">
                <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1 group-hover:text-brand-500 transition-colors font-bold">Travelers</p>
                <p className="text-base font-bold text-gray-900">{details.travelers}</p>
              </div>
            )}
          </div>

          {details.preferences && details.preferences.length > 0 && (
            <div className="group">
              <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2 group-hover:text-brand-500 transition-colors font-bold">Preferences</p>
              <div className="flex flex-wrap gap-2">
                {details.preferences.map((pref: string, i: number) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-xs text-gray-700 font-semibold hover:bg-brand-50 hover:border-brand-200 hover:text-brand-500 transition-all cursor-default shadow-sm"
                  >
                    {pref}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
         <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
               <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-500">
                  {String.fromCharCode(64 + i)}
               </div>
            ))}
            <div className="w-6 h-6 rounded-full border-2 border-white bg-brand-500 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">+</div>
         </div>
         <p className="text-[10px] text-gray-400 font-bold italic">Shared with Travel Lykke Team</p>
      </div>
    </div>
  );
}
