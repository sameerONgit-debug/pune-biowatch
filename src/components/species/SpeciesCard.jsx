import React from 'react';
import { ChevronRight, CloudRain, Flame, Grid, Thermometer } from 'lucide-react';
import { IUCNBadge, SeverityBadge } from '../common/Badge';

export default function SpeciesCard({ species, onSelect }) {
  const threatIcons = {
    temperatureSensitivity: { icon: Thermometer, label: 'Temperature' },
    rainfallVariabilityImpact: { icon: CloudRain, label: 'Rainfall' },
    habitatFragmentation: { icon: Grid, label: 'Fragmentation' },
    urbanHeatIslandEffect: { icon: Flame, label: 'Urban heat' },
  };

  const getThreatColor = (level) => {
    switch (level) {
      case 'Critical': return 'border-[#743e39] bg-[#2b1b1c] text-[#ff9d8a]';
      case 'High': return 'border-[#6b552e] bg-[#2f291b] text-[#ffd184]';
      case 'Moderate': return 'border-[#285442] bg-[#102d22] text-[#9ee7b8]';
      default: return 'border-[#1d4032] bg-[#0b2119] text-[#86a99a]';
    }
  };

  const scoreColor = species.severityScore >= 85 ? 'bg-[#ff806e]' : species.severityScore >= 70 ? 'bg-[#e2ad56]' : 'bg-[#5bc889]';

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#1a3c2f] bg-gradient-to-br from-[#0f271f] to-[#091a15] shadow-[0_14px_36px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-1 hover:border-[#73e5cf]/45 hover:shadow-[0_26px_55px_rgba(0,0,0,0.32)]">
      <div className="flex-1 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3"><span className="rounded-full border border-[#285442] bg-[#102d22] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#9ee7b8]">{species.category}</span><div className="flex flex-wrap justify-end gap-1.5"><IUCNBadge status={species.iucnStatus} /><SeverityBadge severity={species.climateSeverity} /></div></div>
        <h3 className="mt-5 text-lg font-extrabold leading-snug tracking-[-0.03em] text-[#edf9ef] transition-colors group-hover:text-[#d9f99d]">{species.commonName}</h3>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5"><span className="font-serif text-xs italic text-[#86a99a]">{species.scientificName}</span>{species.marathiName && <span className="text-[11px] font-bold text-[#73e5cf]">· {species.marathiName}</span>}</div>
        <div className="mt-5 rounded-2xl border border-[#1b4032] bg-[#091a15] p-3.5"><div className="flex items-center justify-between gap-3"><span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#78988a]">Climate impact score</span><span className="font-mono text-sm font-extrabold text-[#eaf8ed]">{species.severityScore}<span className="text-[10px] text-[#78988a]"> / 100</span></span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-[#1c3b2f]"><div className={`h-full rounded-full ${scoreColor}`} style={{ width: `${species.severityScore}%` }} /></div></div>
        <p className="mt-4 line-clamp-3 text-xs leading-6 text-[#99b5a7]">{species.description}</p>
        <div className="mt-5 border-t border-[#193d2f] pt-4"><div className="mb-2.5 text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#78988a]">Sensitivity profile</div><div className="grid grid-cols-2 gap-2">{Object.entries(species.climateThreatFactors || {}).map(([factor, level]) => { const meta = threatIcons[factor] || { label: factor, icon: Flame }; const Icon = meta.icon; return <div key={factor} className={`flex min-w-0 items-center justify-between gap-1 rounded-xl border px-2.5 py-2 text-[10px] ${getThreatColor(level)}`}><span className="flex min-w-0 items-center gap-1.5 font-semibold"><Icon className="h-3 w-3 shrink-0 opacity-70" /><span className="truncate">{meta.label}</span></span><span className="shrink-0 text-[9px] font-extrabold uppercase">{level}</span></div>; })}</div></div>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-[#193d2f] bg-[#0b2119] px-5 py-3.5 text-[10px] font-bold text-[#78988a] sm:px-6"><span>{species.regions?.length || 0} documented {species.regions?.length === 1 ? 'habitat' : 'habitats'}</span><button onClick={() => onSelect(species)} className="inline-flex items-center gap-1 text-xs font-extrabold text-[#73e5cf] transition-transform group-hover:translate-x-0.5 hover:text-[#d9f99d]">Open dossier <ChevronRight className="h-3.5 w-3.5" /></button></div>
    </article>
  );
}
