import React from 'react';
import pashan2024 from '../../assets/satellite/pashan-2024.svg';
import {
  ArrowRight,
  Compass,
  Layers,
  Leaf,
  Mountain,
  ShieldAlert,
  Waves,
  Wind,
} from 'lucide-react';

export default function HeroSection({ setActiveTab, urgentAlert }) {
  return (
    <section className="surface-dark relative overflow-hidden">
      <div className="pointer-events-none absolute -right-28 -top-32 h-96 w-96 rounded-full bg-[#d5f36b]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-44 left-1/3 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(213,243,107,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(213,243,107,0.5)_1px,transparent_1px)] [background-size:34px_34px] [mask-image:linear-gradient(to_bottom,black,transparent_76%)]" />

      <div className="relative grid gap-10 px-6 py-8 sm:px-9 sm:py-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-14 lg:px-12 lg:py-12">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d5f36b]/25 bg-white/[0.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#d5f36b]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d5f36b] shadow-[0_0_0_4px_rgba(213,243,107,0.14)]" />
            Pune district ecological monitoring network
          </div>

          <h1 className="max-w-xl text-4xl font-extrabold leading-[1.05] tracking-[-0.055em] text-white sm:text-5xl lg:text-[4.25rem]">
            A clearer view of
            <span className="block text-[#d5f36b]">nature under pressure.</span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-emerald-50/70 sm:text-base">
            Pune BioWatch brings habitats, climate signals and field observations into one living picture — from the misty Sahyadri crest to the city&apos;s last urban wetlands.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('regions')}
              className="inline-flex items-center gap-2 rounded-xl bg-[#d5f36b] px-4 py-3 text-xs font-extrabold text-[#0b3028] shadow-[0_12px_25px_rgba(213,243,107,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#e1fb83]"
            >
              <Compass className="h-4 w-4" />
              Explore monitored regions
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActiveTab('satellite')}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.07] px-4 py-3 text-xs font-bold text-white transition-colors hover:bg-white/[0.13]"
            >
              <Layers className="h-4 w-4 text-[#a8e6b8]" />
              Compare landscape change
            </button>
          </div>

          {urgentAlert && (
            <button
              onClick={() => setActiveTab('alerts')}
              className="mt-8 flex w-full max-w-xl items-center gap-3 rounded-2xl border border-[#e99786]/35 bg-[#4a2426]/45 p-3 text-left transition-colors hover:bg-[#5a292b]/60"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e99786]/15 text-[#ffb1a0]">
                <ShieldAlert className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[9px] font-bold uppercase tracking-[0.17em] text-[#ffb1a0]">Priority signal</span>
                <span className="mt-0.5 block truncate text-xs font-bold text-white">{urgentAlert.speciesName}</span>
                <span className="block truncate text-[10px] text-rose-100/60">{urgentAlert.regionName} · {urgentAlert.category}</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-[#ffb1a0]" />
            </button>
          )}
        </div>

        <div className="relative mx-auto w-full max-w-[560px] lg:ml-auto">
          <div className="absolute -inset-3 rounded-[2rem] border border-[#a8e6b8]/15 bg-[#a8e6b8]/5 blur-sm" />
          <div className="relative overflow-hidden rounded-[1.65rem] border border-white/15 bg-[#071d1e] p-2 shadow-2xl">
            <div className="relative aspect-[1.12/1] overflow-hidden rounded-[1.25rem] bg-[#0b3028]">
              <img
                src={pashan2024}
                alt="False-colour satellite view of Pashan Lake wetland"
                className="h-full w-full object-cover opacity-90 transition-transform duration-700 hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071d1e]/80 via-transparent to-[#071d1e]/10" />
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-[#071d1e]/75 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#d5f36b] backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d5f36b]" />
                Observation layer · 2024
              </div>
              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-[#071d1e]/75 p-2.5 backdrop-blur-md">
                  <div className="text-[9px] uppercase tracking-[0.13em] text-emerald-100/50">Open water</div>
                  <div className="mt-1 text-lg font-extrabold text-[#ffb1a0]">−48.4%</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#071d1e]/75 p-2.5 backdrop-blur-md">
                  <div className="text-[9px] uppercase tracking-[0.13em] text-emerald-100/50">Zones live</div>
                  <div className="mt-1 text-lg font-extrabold text-[#d5f36b]">08 / 08</div>
                </div>
                <div className="hidden rounded-xl border border-white/10 bg-[#071d1e]/75 p-2.5 backdrop-blur-md sm:block">
                  <div className="text-[9px] uppercase tracking-[0.13em] text-emerald-100/50">Signal</div>
                  <div className="mt-1 flex items-center gap-1.5 text-sm font-extrabold text-[#a8e6b8]"><span className="h-1.5 w-1.5 rounded-full bg-[#a8e6b8]" />Live</div>
                </div>
              </div>
            </div>
          </div>
          <div className="float-slow absolute -right-4 -top-5 hidden rounded-2xl border border-[#d5f36b]/25 bg-[#173e34]/95 px-3 py-2 shadow-xl sm:block">
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#d5f36b]"><Leaf className="h-3.5 w-3.5" /> 18 species tracked</div>
            <div className="mt-1 text-[9px] text-emerald-100/50">Indicator biodiversity index</div>
          </div>
        </div>
      </div>

      <div className="relative grid gap-4 border-t border-white/10 bg-black/10 px-6 py-4 sm:grid-cols-3 sm:px-9 lg:px-12">
        <div className="flex items-center gap-3 text-xs text-emerald-50/65">
          <Mountain className="h-4 w-4 shrink-0 text-[#a8e6b8]" />
          <span><strong className="text-white">1,312m</strong> highest monitored ridge</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-emerald-50/65">
          <Waves className="h-4 w-4 shrink-0 text-cyan-300" />
          <span><strong className="text-white">8 habitats</strong> across one district</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-emerald-50/65">
          <Wind className="h-4 w-4 shrink-0 text-[#d5f36b]" />
          <span><strong className="text-white">10-year</strong> climate baseline</span>
        </div>
      </div>
    </section>
  );
}
