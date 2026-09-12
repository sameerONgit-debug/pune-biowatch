import React, { useEffect } from 'react';
import { X, Thermometer, CloudRain, Grid, Flame, MapPin, AlertCircle, ShieldCheck, ExternalLink } from 'lucide-react';
import { IUCNBadge, SeverityBadge } from '../common/Badge';

export default function SpeciesModal({ species, isOpen, onClose, onSelectRegion, regions = [] }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !species) return null;

  const threatDetails = [
    {
      factor: 'temperatureSensitivity',
      label: 'Thermal Sensitivity',
      icon: Thermometer,
      level: species.climateThreatFactors?.temperatureSensitivity,
      desc: 'Vulnerability of physiological thermal thresholds, embryonic incubation, or flight endurance to peak ambient temperatures.',
    },
    {
      factor: 'rainfallVariabilityImpact',
      label: 'Precipitation Rhythm Impact',
      icon: CloudRain,
      level: species.climateThreatFactors?.rainfallVariabilityImpact,
      desc: 'Susceptibility to erratic monsoon onset, prolonged dry spells, torrential runoff, and delayed reproductive cues.',
    },
    {
      factor: 'habitatFragmentation',
      label: 'Canopy & Corridor Fragmentation',
      icon: Grid,
      level: species.climateThreatFactors?.habitatFragmentation,
      desc: 'Obstacles caused by highways, urban sprawl, and monoculture clearing preventing genetic flow and seasonal migration.',
    },
    {
      factor: 'urbanHeatIslandEffect',
      label: 'Urban Heat Island (UHI) Radiance',
      icon: Flame,
      level: species.climateThreatFactors?.urbanHeatIslandEffect,
      desc: 'Direct exposure to asphalt nocturnal heat retention, artificial lighting, and microclimate warming over 4°C above rural baselines.',
    },
  ];

  const getLevelBadgeClass = (lvl) => {
    switch (lvl) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-300 font-bold';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-300 font-bold';
      case 'Moderate':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 pb-5 flex items-start justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs font-mono font-semibold uppercase bg-emerald-900/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700/60">
                {species.category}
              </span>
              <IUCNBadge status={species.iucnStatus} />
              <SeverityBadge severity={species.climateSeverity} />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white">
              {species.commonName}
            </h2>
            <div className="flex items-center space-x-2 text-sm text-slate-300 mt-0.5">
              <span className="font-serif italic text-emerald-300">{species.scientificName}</span>
              {species.marathiName && <span>• {species.marathiName}</span>}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Habitat summary */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">
              Primary Pune Habitat Profile
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {species.habitat}
            </p>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">
              Ecological Overview & Climate Context
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {species.description}
            </p>
          </div>

          {/* Climate Stress Factors */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-3">
              Climate Sensitivity Matrix
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {threatDetails.map((threat) => {
                const Icon = threat.icon;
                return (
                  <div
                    key={threat.factor}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center space-x-1.5">
                        <Icon className="w-4 h-4 text-slate-600" />
                        <span className="text-xs font-bold text-slate-800">{threat.label}</span>
                      </div>
                      <span
                        className={`text-[10px] uppercase px-2 py-0.5 rounded border ${getLevelBadgeClass(
                          threat.level
                        )}`}
                      >
                        {threat.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal">{threat.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Threat Indicators */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4">
            <div className="flex items-center space-x-2 text-amber-800 text-xs font-bold uppercase tracking-wider font-mono mb-1">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Observed Regional Stress Indicators</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed font-medium">
              {species.keyThreatIndicators}
            </p>
          </div>

          {/* Recommended Conservation Action */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4">
            <div className="flex items-center space-x-2 text-emerald-800 text-xs font-bold uppercase tracking-wider font-mono mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Recommended Administration & Forest Action</span>
            </div>
            <p className="text-xs text-emerald-950 leading-relaxed">
              {species.recommendedAction}
            </p>
          </div>

          {/* Pune Sub-Regions Distribution */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-2">
              Documented Occurrence Across Pune Sub-Regions
            </h4>
            <div className="flex flex-wrap gap-2">
              {species.regions?.map((regId) => {
                const regionObj = regions.find((r) => r.id === regId);
                const name = regionObj ? regionObj.name : regId;
                return (
                  <button
                    key={regId}
                    onClick={() => {
                      if (onSelectRegion && regionObj) {
                        onSelectRegion(regionObj);
                        onClose();
                      }
                    }}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 text-xs font-medium transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{name}</span>
                    <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center text-xs">
          <span className="text-slate-400 font-mono">
            Species ID: {species.id}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-lg transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
