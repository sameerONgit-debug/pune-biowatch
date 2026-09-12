import React from 'react';
import { IUCNBadge, SeverityBadge } from '../common/Badge';
import { Thermometer, CloudRain, Grid, Flame, ChevronRight } from 'lucide-react';

export default function SpeciesCard({ species, onSelect, regionMap = {} }) {
  const threatIcons = {
    temperatureSensitivity: { icon: Thermometer, label: 'Temp' },
    rainfallVariabilityImpact: { icon: CloudRain, label: 'Rain' },
    habitatFragmentation: { icon: Grid, label: 'Fragmentation' },
    urbanHeatIslandEffect: { icon: Flame, label: 'UHI' },
  };

  const getThreatColor = (level) => {
    switch (level) {
      case 'Critical':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'High':
        return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'Moderate':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden group">
      <div className="p-5">
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-mono font-semibold uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            {species.category}
          </span>
          <div className="flex items-center space-x-1.5">
            <IUCNBadge status={species.iucnStatus} />
            <SeverityBadge severity={species.climateSeverity} />
          </div>
        </div>

        {/* Names */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
          {species.commonName}
        </h3>
        <div className="flex items-baseline space-x-2 mb-2">
          <span className="text-xs font-serif italic text-slate-500">{species.scientificName}</span>
          {species.marathiName && (
            <span className="text-xs text-emerald-800 font-medium font-sans">
              • {species.marathiName}
            </span>
          )}
        </div>

        {/* Climate Sensitivity Score Bar */}
        <div className="my-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <div className="flex justify-between text-xs font-mono mb-1.5">
            <span className="text-slate-600 font-medium">Climate Impact Score:</span>
            <span className="font-bold text-slate-900">{species.severityScore}/100</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                species.severityScore >= 85
                  ? 'bg-red-500'
                  : species.severityScore >= 70
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${species.severityScore}%` }}
            ></div>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
          {species.description}
        </p>

        {/* Threat Factors Pills */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold">
            Key Climate Threat Sensitivity
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {Object.entries(species.climateThreatFactors || {}).map(([factor, level]) => {
              const meta = threatIcons[factor] || { label: factor, icon: Flame };
              const Icon = meta.icon;
              return (
                <div
                  key={factor}
                  className={`flex items-center justify-between px-2 py-1 rounded text-[11px] border ${getThreatColor(
                    level
                  )}`}
                >
                  <div className="flex items-center space-x-1 truncate">
                    <Icon className="w-3 h-3 opacity-70" />
                    <span className="truncate">{meta.label}</span>
                  </div>
                  <span className="font-bold text-[10px]">{level}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="text-slate-500 truncate max-w-[170px]">
          {species.regions?.length || 0} Pune {species.regions?.length === 1 ? 'habitat' : 'habitats'}
        </div>
        <button
          onClick={() => onSelect(species)}
          className="inline-flex items-center space-x-1 font-semibold text-emerald-700 hover:text-emerald-900 group-hover:translate-x-0.5 transition-transform"
        >
          <span>View Dossier</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
