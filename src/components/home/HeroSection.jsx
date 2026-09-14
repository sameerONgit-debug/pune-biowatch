import React from 'react';
import heroPuneWetland from '../../assets/hero-pune-wetland.webp';
import {
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

export default function HeroSection({ setActiveTab, urgentAlert }) {
  return (
    <section className="surface-dark relative min-h-[590px] overflow-hidden">
      <img
        src={heroPuneWetland}
        alt="Aerial view of a wetland winding through the Western Ghats"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-80"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,36,29,0.98)_0%,rgba(7,50,39,0.87)_37%,rgba(8,49,39,0.42)_70%,rgba(5,29,29,0.35)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,29,29,0.88)_0%,transparent_34%,rgba(4,28,28,0.12)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(213,243,107,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(213,243,107,0.5)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" />

      <div className="relative z-10 flex min-h-[590px] flex-col justify-between px-6 py-7 sm:px-9 sm:py-10 lg:px-12 lg:py-12">
        <div className="flex items-start justify-between gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d5f36b]/30 bg-[#0a332a]/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#d5f36b] backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d5f36b] opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#d5f36b]" />
            </span>
            Pune district ecological monitoring network
          </div>
          <div className="hidden rounded-2xl border border-white/15 bg-[#082a25]/65 px-3.5 py-3 backdrop-blur-md sm:block">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-50/55"><MapPin className="h-3.5 w-3.5 text-[#d5f36b]" /> 18.5204° N · 73.8567° E</div>
            <div className="mt-1.5 flex items-center gap-1.5 text-[10px] font-bold text-[#a8e6b8]"><span className="h-1.5 w-1.5 rounded-full bg-[#a8e6b8]" /> Network status: operational</div>
          </div>
        </div>

        <div className="grid items-center gap-10 pb-12 pt-16 lg:grid-cols-[1fr_330px] lg:gap-20">
          <div className="max-w-3xl">
            <h1 className="max-w-3xl text-5xl font-extrabold leading-[0.98] tracking-[-0.065em] text-white sm:text-6xl lg:text-[5.6rem]">
              Pune, in a
              <span className="block text-[#d5f36b]">living state.</span>
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-emerald-50/75 sm:text-base sm:leading-8">
              See climate pressure as it moves through hills, wetlands and city corridors. Pune BioWatch turns ecological signals into decisions people can act on.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('regions')}
                className="inline-flex items-center gap-2 rounded-xl bg-[#d5f36b] px-4 py-3 text-xs font-extrabold text-[#0b3028] shadow-[0_12px_25px_rgba(213,243,107,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#e1fb83]"
              >
                <Compass className="h-4 w-4" />
                Explore the living map
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setActiveTab('species')}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.08] px-4 py-3 text-xs font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/[0.16]"
              >
                <Leaf className="h-4 w-4 text-[#a8e6b8]" />
                Meet the indicator species
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="rounded-[1.6rem] border border-white/15 bg-[#082a25]/72 p-4 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-50/60"><Layers3 className="h-3.5 w-3.5 text-[#d5f36b]" /> Observatory pulse</div>
                <span className="rounded-full bg-[#d5f36b]/15 px-2 py-1 text-[9px] font-bold text-[#d5f36b]">LIVE</span>
              </div>
              <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-50/50">Current focus</div>
              <div className="mt-1 text-lg font-extrabold tracking-[-0.03em] text-white">Pashan Lake Wetland</div>
              <div className="mt-1 text-[11px] leading-5 text-emerald-50/55">Open water and migratory habitat are under active observation.</div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-white/10 bg-black/10 p-3"><div className="text-[9px] uppercase tracking-[0.13em] text-emerald-50/45">Open water</div><div className="mt-1 text-xl font-extrabold text-[#ffb1a0]">−48.4%</div><div className="mt-1 text-[9px] text-emerald-50/45">since 2014</div></div>
                <div className="rounded-xl border border-white/10 bg-black/10 p-3"><div className="text-[9px] uppercase tracking-[0.13em] text-emerald-50/45">Zones online</div><div className="mt-1 text-xl font-extrabold text-[#d5f36b]">08 / 08</div><div className="mt-1 text-[9px] text-emerald-50/45">district network</div></div>
              </div>
              <button onClick={() => setActiveTab('satellite')} className="mt-3 flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 text-[10px] font-bold text-emerald-50/70 transition-colors hover:bg-white/[0.12] hover:text-white"><span>Compare landscape change</span><ArrowRight className="h-3.5 w-3.5 text-[#d5f36b]" /></button>
            </div>
          </div>
        </div>

        {urgentAlert && (
          <button
            onClick={() => setActiveTab('alerts')}
            className="group flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-[#e99786]/35 bg-[#4a2426]/65 p-3 text-left backdrop-blur-md transition-colors hover:bg-[#5a292b]/75"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e99786]/15 text-[#ffb1a0]"><ShieldAlert className="h-4 w-4" /></span>
            <span className="min-w-0 flex-1">
              <span className="block text-[9px] font-bold uppercase tracking-[0.17em] text-[#ffb1a0]">Priority signal · requires attention</span>
              <span className="mt-0.5 block truncate text-xs font-bold text-white">{urgentAlert.speciesName}</span>
              <span className="block truncate text-[10px] text-rose-100/65">{urgentAlert.regionName} · {urgentAlert.category}</span>
            </span>
            <span className="flex shrink-0 items-center gap-1 text-[10px] font-bold text-[#ffb1a0] transition-transform group-hover:translate-x-1">Review <ArrowRight className="h-3.5 w-3.5" /></span>
          </button>
        )}
      </div>

      <div className="relative z-10 grid gap-4 border-t border-white/15 bg-[#061f1d]/45 px-6 py-4 backdrop-blur-md sm:grid-cols-3 sm:px-9 lg:px-12">
        <div className="flex items-center gap-3 text-xs text-emerald-50/65"><Mountain className="h-4 w-4 shrink-0 text-[#a8e6b8]" /><span><strong className="text-white">1,312m</strong> highest monitored ridge</span></div>
        <div className="flex items-center gap-3 text-xs text-emerald-50/65"><Waves className="h-4 w-4 shrink-0 text-cyan-300" /><span><strong className="text-white">8 habitats</strong> across one district</span></div>
        <div className="flex items-center gap-3 text-xs text-emerald-50/65"><Wind className="h-4 w-4 shrink-0 text-[#d5f36b]" /><span><strong className="text-white">10-year</strong> climate baseline</span></div>
      </div>
    </section>
  );
}
