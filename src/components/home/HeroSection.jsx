import React from 'react';
import heroPuneWetland from '../../assets/hero-pune-wetland.webp';
import {
  Activity,
  ArrowRight,
  Compass,
  Layers3,
  Leaf,
  MapPin,
  Mountain,
  ShieldAlert,
  Waves,
  Wind,
} from 'lucide-react';

export default function HeroSection({ setActiveTab, urgentAlert, activeSignalCount = 0, regionCount = 8 }) {
  return (
    <section className="surface-dark relative min-h-[600px] overflow-hidden">
      <img src={heroPuneWetland} alt="Aerial view of a wetland winding through the Western Ghats" className="absolute inset-0 h-full w-full object-cover object-center opacity-75" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,18,15,0.98)_0%,rgba(4,31,24,0.9)_36%,rgba(4,35,28,0.56)_70%,rgba(2,18,20,0.34)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(3,17,16,0.96)_0%,transparent_31%,rgba(2,18,18,0.18)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(115,229,207,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(115,229,207,0.45)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" />

      <div className="relative z-10 flex min-h-[600px] flex-col justify-between px-6 py-7 sm:px-9 sm:py-10 lg:px-12 lg:py-12">
        <div className="flex items-start justify-between gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#73e5cf]/30 bg-[#061b17]/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.17em] text-[#73e5cf] backdrop-blur-md"><span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d9f99d] opacity-70" /><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#d9f99d]" /></span>Regional observatory · modeled feed</div>
          <div className="hidden rounded-2xl border border-white/15 bg-[#051b17]/70 px-3.5 py-3 backdrop-blur-md sm:block">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#91aea2]"><MapPin className="h-3.5 w-3.5 text-[#d9f99d]" /> Pune district · 18.5204° N</div>
            <div className="mt-1.5 flex items-center gap-1.5 text-[10px] font-bold text-[#a8e6b8]"><span className="h-1.5 w-1.5 rounded-full bg-[#a8e6b8]" /> {regionCount} zones indexed against baseline</div>
          </div>
        </div>

        <div className="grid items-center gap-10 pb-12 pt-16 lg:grid-cols-[1fr_345px] lg:gap-20">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#d9f99d]"><Activity className="h-3.5 w-3.5" /> Read the landscape before it changes</div>
            <h1 className="max-w-3xl text-5xl font-extrabold leading-[0.96] tracking-[-0.07em] text-white sm:text-6xl lg:text-[5.7rem]">Pune, in a<span className="block text-[#d9f99d]">living state.</span></h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#d9e9df]/78 sm:text-base sm:leading-8">A mission-control view of biodiversity, climate pressure and field intelligence — built for the people making decisions on the ground.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => setActiveTab('regions')} className="inline-flex items-center gap-2 rounded-xl bg-[#d9f99d] px-4 py-3 text-xs font-extrabold text-[#06110f] shadow-[0_12px_25px_rgba(173,224,101,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#efffbd]"><Compass className="h-4 w-4" />Open living map<ArrowRight className="h-4 w-4" /></button>
              <button onClick={() => setActiveTab('satellite')} className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.08] px-4 py-3 text-xs font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/[0.16]"><Layers3 className="h-4 w-4 text-[#73e5cf]" />Inspect landscape change</button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="rounded-[1.6rem] border border-[#73e5cf]/25 bg-[#061b17]/78 p-4 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3"><div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8ca99d]"><Layers3 className="h-3.5 w-3.5 text-[#73e5cf]" /> Watch console</div><span className="rounded-full border border-[#b7dc7a]/25 bg-[#d9f99d]/10 px-2 py-1 text-[9px] font-bold text-[#d9f99d]">RUNNING</span></div>
              <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#83a396]">Current focus</div>
              <div className="mt-1 text-lg font-extrabold tracking-[-0.03em] text-white">Pashan Lake Wetland</div>
              <div className="mt-1 text-[11px] leading-5 text-[#87a59a]">Open water and migratory habitat are under active observation.</div>
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/15 px-3 py-2.5"><span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#78988a]">Open water change</span><span className="font-mono text-sm font-extrabold text-[#ff9c88]">−48.4%</span></div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/15 px-3 py-2.5"><span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#78988a]">Species indexed</span><span className="font-mono text-sm font-extrabold text-[#d9f99d]">18 taxa</span></div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/15 px-3 py-2.5"><span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#78988a]">Signals requiring review</span><span className="font-mono text-sm font-extrabold text-[#ff9c88]">{activeSignalCount}</span></div>
              </div>
              <button onClick={() => setActiveTab('satellite')} className="mt-3 flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 text-[10px] font-bold text-[#a2bdb0] transition-colors hover:bg-white/[0.12] hover:text-white"><span>Open observation layer</span><ArrowRight className="h-3.5 w-3.5 text-[#d9f99d]" /></button>
            </div>
          </div>
        </div>

        {urgentAlert && <button onClick={() => setActiveTab('alerts')} className="group flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-[#ff9884]/35 bg-[#4a2426]/65 p-3 text-left backdrop-blur-md transition-colors hover:bg-[#5a292b]/80"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ff9884]/15 text-[#ffb4a4]"><ShieldAlert className="h-4 w-4" /></span><span className="min-w-0 flex-1"><span className="block text-[9px] font-bold uppercase tracking-[0.17em] text-[#ffb4a4]">Priority signal · modeled threshold</span><span className="mt-0.5 block truncate text-xs font-bold text-white">{urgentAlert.speciesName}</span><span className="block truncate text-[10px] text-[#ffddd7]/65">{urgentAlert.regionName} · {urgentAlert.category}</span></span><span className="flex shrink-0 items-center gap-1 text-[10px] font-bold text-[#ffb4a4] transition-transform group-hover:translate-x-1">Review<ArrowRight className="h-3.5 w-3.5" /></span></button>}
      </div>

      <div className="relative z-10 grid gap-4 border-t border-white/15 bg-[#041715]/58 px-6 py-4 backdrop-blur-md sm:grid-cols-3 sm:px-9 lg:px-12"><div className="flex items-center gap-3 text-xs text-[#99b5a7]"><Mountain className="h-4 w-4 shrink-0 text-[#73e5cf]" /><span><strong className="text-white">1,312m</strong> highest ridge watched</span></div><div className="flex items-center gap-3 text-xs text-[#99b5a7]"><Waves className="h-4 w-4 shrink-0 text-[#73e5cf]" /><span><strong className="text-white">8 habitats</strong> in one network</span></div><div className="flex items-center gap-3 text-xs text-[#99b5a7]"><Wind className="h-4 w-4 shrink-0 text-[#d9f99d]" /><span><strong className="text-white">10 years</strong> of climate baseline</span></div></div>
    </section>
  );
}
