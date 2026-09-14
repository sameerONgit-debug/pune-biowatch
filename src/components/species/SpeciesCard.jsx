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
      case 'Critical':
        return 'border-[#f2c8bf] bg-[#fff5f2] text-[#ae4d40]';
      case 'High':
        return 'border-[#f0d9a7] bg-[#fff9ed] text-[#9d6b25]';
      case 'Moderate':
        return 'border-[#d8e5cf] bg-[#f4faef] text-[#477354]';
      default:
        return 'border-[#e3ebe2] bg-[#f8fbf7] text-[#65756a]';
    }
  };

  const scoreColor = species.severityScore >= 85 ? 'bg-[#db7666]' : species.severityScore >= 70 ? 'bg-[#d7a44d]' : 'bg-[#62a878]';

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#dfe8df] bg-white/90 shadow-[0_12px_32px_rgba(31,62,45,0.06)] transition-all duration-200 hover:-translate-y-1 hover:border-[#bcd7c2] hover:shadow-[0_22px_48px_rgba(31,62,45,0.12)]">
      <div className="flex-1 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-[#eef6ed] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#4d7b5d]">{species.category}</span>
          <div className="flex flex-wrap justify-end gap-1.5">
            <IUCNBadge status={species.iucnStatus} />
            <SeverityBadge severity={species.climateSeverity} />
          </div>
        </div>

        <h3 className="mt-5 text-lg font-extrabold leading-snug tracking-[-0.03em] text-[#193329] transition-colors group-hover:text-[#0e4d3b]">{species.commonName}</h3>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="font-serif text-xs italic text-[#75857b]">{species.scientificName}</span>
          {species.marathiName && <span className="text-[11px] font-bold text-[#39805c]">· {species.marathiName}</span>}
        </div>

        <div className="mt-5 rounded-2xl border border-[#e6eee5] bg-[#f7faf6] p-3.5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#7a8a7e]">Climate impact score</span>
            <span className="font-mono text-sm font-extrabold text-[#1d392d]">{species.severityScore}<span className="text-[10px] text-[#92a197]"> / 100</span></span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e2ebe1]">
            <div className={`h-full rounded-full ${scoreColor}`} style={{ width: `${species.severityScore}%` }} />
          </div>
        </div>

        <p className="mt-4 line-clamp-3 text-xs leading-6 text-[#617168]">{species.description}</p>

        <div className="mt-5 border-t border-[#edf1eb] pt-4">
          <div className="mb-2.5 text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#89978d]">Sensitivity profile</div>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(species.climateThreatFactors || {}).map(([factor, level]) => {
              const meta = threatIcons[factor] || { label: factor, icon: Flame };
              const Icon = meta.icon;
              return (
                <div key={factor} className={`flex min-w-0 items-center justify-between gap-1 rounded-xl border px-2.5 py-2 text-[10px] ${getThreatColor(level)}`}>
                  <span className="flex min-w-0 items-center gap-1.5 font-semibold"><Icon className="h-3 w-3 shrink-0 opacity-70" /><span className="truncate">{meta.label}</span></span>
                  <span className="shrink-0 text-[9px] font-extrabold uppercase">{level}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[#e8eee7] bg-[#f8fbf7] px-5 py-3.5 text-[10px] font-bold text-[#819087] sm:px-6">
        <span>{species.regions?.length || 0} documented {species.regions?.length === 1 ? 'habitat' : 'habitats'}</span>
        <button onClick={() => onSelect(species)} className="inline-flex items-center gap-1 text-xs font-extrabold text-[#28745a] transition-transform group-hover:translate-x-0.5 hover:text-[#0e4d3b]">
          Open dossier <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
}
