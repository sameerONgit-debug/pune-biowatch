import React from 'react';
import { Compass, TreePine, AlertTriangle, ArrowRight, ShieldCheck, Waves, Mountain, Wind } from 'lucide-react';

export default function HeroSection({ setActiveTab, urgentAlert }) {
  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 text-white rounded-2xl overflow-hidden shadow-2xl border border-slate-800 mb-10">
      {/* Decorative background grid pattern & ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto px-6 py-14 sm:py-18 lg:py-20 text-center">
        {/* Region Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono mb-6 backdrop-blur-sm shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>PUNE DISTRICT ECOLOGICAL MONITORING NETWORK</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
          Tracking Climate Pressures on{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            Pune’s Biodiversity
          </span>
        </h1>

        {/* Mission Statement */}
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          From the mist-shrouded crests of the Western Ghats at Mulshi and Sinhagad to urban wetlands like Pashan Lake and remnant city green lungs, Pune BioWatch connects real-time climate stress data with species survival indicators to empower local administration and community conservation.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('regions')}
            className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-900/40 hover:shadow-emerald-700/50 hover:scale-105 transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>Interactive Region Explorer</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveTab('species')}
            className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-semibold text-sm border border-slate-700 hover:border-slate-600 transition-all"
          >
            <TreePine className="w-4 h-4 text-emerald-400" />
            <span>Species Vulnerability Directory</span>
          </button>

          <button
            onClick={() => setActiveTab('satellite')}
            className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-semibold text-sm border border-slate-700 hover:border-slate-600 transition-all"
          >
            <Waves className="w-4 h-4 text-cyan-400" />
            <span>Decadal Satellite Comparison</span>
          </button>
        </div>

        {/* Urgent Live Alert Ticker if available */}
        {urgentAlert && (
          <div
            onClick={() => setActiveTab('alerts')}
            className="inline-flex items-center space-x-3 p-3 px-5 rounded-xl bg-rose-950/80 border border-rose-600/50 text-rose-200 text-xs text-left max-w-2xl cursor-pointer hover:bg-rose-900/80 transition-colors shadow-lg shadow-rose-950/50"
          >
            <div className="p-1.5 rounded-lg bg-rose-600/30 text-rose-400 flex-shrink-0 animate-pulse">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="flex-1 truncate">
              <span className="font-bold uppercase tracking-wider text-rose-300 mr-2">
                Active Critical Alert:
              </span>
              <span className="text-rose-100">{urgentAlert.speciesName} in {urgentAlert.regionName}</span>
              <span className="hidden sm:inline text-rose-300/80 ml-2">— {urgentAlert.category}</span>
            </div>
            <span className="text-[11px] font-semibold text-rose-400 underline underline-offset-2 flex-shrink-0">
              View Action →
            </span>
          </div>
        )}
      </div>

      {/* Highlights Bar */}
      <div className="border-t border-slate-800/80 bg-slate-950/70 px-6 py-3 flex flex-wrap items-center justify-around text-xs font-mono text-slate-400 gap-4">
        <div className="flex items-center space-x-2">
          <Mountain className="w-4 h-4 text-emerald-400" />
          <span>Elevation Range: 540m – 1,312m</span>
        </div>
        <div className="flex items-center space-x-2">
          <Waves className="w-4 h-4 text-cyan-400" />
          <span>Biomes: Western Ghats Edge, Riparian & Dry Scrub</span>
        </div>
        <div className="flex items-center space-x-2">
          <Wind className="w-4 h-4 text-amber-400" />
          <span>Monsoon Shift: SW Monsoon variability indexed</span>
        </div>
      </div>
    </div>
  );
}
