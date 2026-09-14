import React from 'react';
import { ArrowUpRight, Leaf, Shield, Sparkles } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  const links = [
    ['regions', 'Pune sub-region map'],
    ['species', 'Species vulnerability library'],
    ['climate', 'Climate anomaly dashboard'],
    ['satellite', 'Satellite change viewer'],
    ['alerts', 'Administration alert desk'],
    ['about', 'Report a field sighting'],
  ];

  return (
    <footer className="mt-10 border-t border-[#173f34] bg-[#092f27] text-emerald-50/65">
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.75fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d5f36b] text-[#0b3028]"><Leaf className="h-6 w-6" /></span>
              <div>
                <div className="text-lg font-extrabold tracking-[-0.04em] text-white">Pune BioWatch</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#a8e6b8]/65">Ecology, made legible</div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-emerald-50/55">
              An open biodiversity and climate intelligence platform for Pune District — connecting field knowledge, remote sensing and local action.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[10px] font-bold text-[#d5f36b]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d5f36b]" /> Pune Metropolitan Ecological Observatory
            </div>
          </div>

          <div>
            <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.17em] text-[#d5f36b]">Explore the observatory</div>
            <div className="grid gap-2">
              {links.map(([id, label]) => (
                <button key={id} onClick={() => setActiveTab(id)} className="group flex items-center justify-between py-1 text-left text-xs font-semibold text-emerald-50/60 transition-colors hover:text-white">
                  <span>{label}</span><ArrowUpRight className="h-3.5 w-3.5 text-emerald-50/25 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#d5f36b]" />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.17em] text-[#d5f36b]"><Sparkles className="h-3.5 w-3.5" /> Project note</div>
            <p className="mt-3 text-xs leading-6 text-emerald-50/60">
              Built for academic research, planning simulation and public awareness. Public weather, biodiversity and satellite providers are used where available; bundled regional profiles remain available as an offline fallback.
            </p>
            <div className="mt-4 border-t border-white/10 pt-4 text-[10px] leading-5 text-emerald-50/40">
              Live integrations: Open-Meteo weather/archive, GBIF occurrence records and NASA Worldview/GIBS imagery. Curated context: IMD and regional conservation literature.
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 text-[10px] font-medium text-emerald-50/35 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2024 Pune BioWatch Initiative · Maharashtra Eco-Region #MH-12</span>
          <span className="inline-flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-[#a8e6b8]" /> Public environmental asset</span>
        </div>
      </div>
    </footer>
  );
}
