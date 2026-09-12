import React, { useState } from 'react';
import PuneLeafletMap from '../components/map/PuneLeafletMap';
import SpeciesCard from '../components/species/SpeciesCard';
import { SeverityBadge, IUCNBadge } from '../components/common/Badge';
import {
  MapPin,
  Thermometer,
  CloudRain,
  Mountain,
  AlertTriangle,
  Layers,
  ArrowRight,
  ShieldCheck,
  Compass,
  TreePine,
  ExternalLink,
} from 'lucide-react';

import pashan2024 from '../assets/satellite/pashan-2024.svg';
import sinhagad2024 from '../assets/satellite/sinhagad-2024.svg';
import urban2024 from '../assets/satellite/urban-2024.svg';
import mulshi2024 from '../assets/satellite/mulshi-2024.svg';

export default function RegionExplorerPage({
  regions = [],
  species = [],
  alerts = [],
  selectedRegion = null,
  setSelectedRegion,
  onSelectSpecies,
  setActiveTab,
}) {
  const currentRegion = selectedRegion || regions[0];

  const satelliteMap = {
    pashan: pashan2024,
    sinhagad: sinhagad2024,
    'urban-pune': urban2024,
    mulshi: mulshi2024,
    tekdi: urban2024,
    bhimashankar: sinhagad2024,
    panshet: mulshi2024,
    'mula-mutha': urban2024,
  };

  const currentSatImg =
    satelliteMap[currentRegion?.satelliteImageKey] || pashan2024;

  // Species in this region
  const regionSpecies = currentRegion
    ? species.filter((s) => s.regions?.includes(currentRegion.id))
    : [];

  // Alerts in this region
  const regionAlerts = currentRegion
    ? alerts.filter((a) => a.regionId === currentRegion.id)
    : [];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase text-emerald-700 font-bold">
            <Compass className="w-4 h-4" />
            <span>Interactive Pune Spatial Explorer</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
            Pune District Ecological Zones & Habitats
          </h1>
          <p className="text-xs text-slate-500">
            Select any sub-region on the map or the list to view microclimate stress, satellite observation, and resident indicator species.
          </p>
        </div>

        {/* Region Selector Dropdown for Mobile / Quick Select */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500 font-mono font-medium">Zone:</span>
          <select
            value={currentRegion?.id || ''}
            onChange={(e) => {
              const target = regions.find((r) => r.id === e.target.value);
              if (target) setSelectedRegion(target);
            }}
            className="text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Map & Selected Region Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Interactive Map & Zone List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <PuneLeafletMap
              regions={regions}
              selectedRegionId={currentRegion?.id}
              onSelectRegion={(reg) => setSelectedRegion(reg)}
              height="400px"
            />
          </div>

          {/* Quick Sub-region Switcher Tiles */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
              All 8 Pune Sub-Regions
            </div>
            <div className="grid grid-cols-2 gap-2">
              {regions.map((reg) => {
                const isSelected = reg.id === currentRegion?.id;
                return (
                  <button
                    key={reg.id}
                    onClick={() => setSelectedRegion(reg)}
                    className={`p-2.5 rounded-xl text-left border text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-md scale-[1.02]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-bold truncate">{reg.name}</div>
                    <div
                      className={`text-[10px] font-mono mt-0.5 ${
                        isSelected ? 'text-emerald-200' : 'text-slate-400'
                      }`}
                    >
                      Score: {reg.metrics.vulnerabilityScore}/100
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Comprehensive Region Dossier (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {currentRegion && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Region Header Banner */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold uppercase bg-emerald-900 text-emerald-300 px-2.5 py-0.5 rounded border border-emerald-700/60">
                    {currentRegion.habitatType}
                  </span>
                  <div className="flex items-center space-x-2 font-mono text-xs">
                    <span className="text-slate-400">Vulnerability Score:</span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded ${
                        currentRegion.metrics.vulnerabilityScore >= 85
                          ? 'bg-red-500 text-white'
                          : currentRegion.metrics.vulnerabilityScore >= 75
                          ? 'bg-amber-500 text-slate-900'
                          : 'bg-emerald-500 text-white'
                      }`}
                    >
                      {currentRegion.metrics.vulnerabilityScore}/100
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl font-extrabold tracking-tight">
                  {currentRegion.name}
                </h2>
                <div className="text-xs text-emerald-300 font-sans mt-0.5">
                  {currentRegion.localName}
                </div>

                {/* Coordinates & Geography Tags */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 mt-4 pt-3 border-t border-slate-700/80">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>
                      {currentRegion.coordinates.lat}°N, {currentRegion.coordinates.lng}°E
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Mountain className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Elevation: {currentRegion.elevationMeters} m</span>
                  </div>
                  <div>
                    <span>Area: {currentRegion.areaKm2} km²</span>
                  </div>
                </div>
              </div>

              {/* Region Dossier Body */}
              <div className="p-6 space-y-6">
                {/* Description */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-1.5">
                    Ecological Character & Role
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    {currentRegion.description}
                  </p>
                </div>

                {/* Climate & Microclimate Metrics Grid */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2.5">
                    Sub-Region Microclimate Profile
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="text-[10px] uppercase font-mono text-slate-400">Peak Summer Temp</div>
                      <div className="text-sm font-bold text-slate-900 mt-1">
                        {currentRegion.climateSummary.avgSummerTemp}
                      </div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="text-[10px] uppercase font-mono text-slate-400">Annual Rainfall</div>
                      <div className="text-sm font-bold text-blue-700 mt-1">
                        {currentRegion.climateSummary.annualRainfall}
                      </div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="text-[10px] uppercase font-mono text-slate-400">Rainfall Variance</div>
                      <div className="text-xs font-bold text-amber-700 mt-1">
                        {currentRegion.climateSummary.rainfallAnomaly}
                      </div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="text-[10px] uppercase font-mono text-slate-400">Humidity Range</div>
                      <div className="text-sm font-bold text-slate-800 mt-1">
                        {currentRegion.climateSummary.humidityRange}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary Threats Callout */}
                <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-amber-800 font-bold mb-2 flex items-center space-x-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Key Climatic & Anthropogenic Stress Factors</span>
                  </div>
                  <ul className="space-y-1 text-xs text-amber-950">
                    {currentRegion.climateSummary.primaryThreats.map((threat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{threat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Satellite Preview Card */}
                <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 p-4 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-mono font-bold uppercase">
                        Satellite Observation (2024 Sentinel-2 Simulation)
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveTab('satellite')}
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
                    >
                      <span>Open Before/After Slider</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="w-full aspect-[16/8] rounded-lg overflow-hidden border border-slate-700 relative">
                    <img
                      src={currentSatImg}
                      alt={currentRegion.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-slate-950/80 px-2 py-1 rounded text-[10px] font-mono text-emerald-300">
                      Decadal Tree Canopy Loss: {currentRegion.metrics.treeCanopyLossPercent}%
                    </div>
                  </div>
                </div>

                {/* Resident / Affected Species in this Region */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                      Documented Indicator Species in this Zone ({regionSpecies.length})
                    </h4>
                    <button
                      onClick={() => setActiveTab('species')}
                      className="text-xs text-emerald-700 font-semibold hover:underline"
                    >
                      View All in Database →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {regionSpecies.map((sp) => (
                      <div
                        key={sp.id}
                        onClick={() => onSelectSpecies(sp)}
                        className="p-3 bg-slate-50 hover:bg-emerald-50/70 rounded-xl border border-slate-200 transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-xs text-slate-900">
                            {sp.commonName}
                          </div>
                          <div className="text-[11px] font-serif italic text-slate-500">
                            {sp.scientificName}
                          </div>
                          <div className="mt-1 flex items-center space-x-1">
                            <SeverityBadge severity={sp.climateSeverity} />
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-slate-700">
                            {sp.severityScore}/100
                          </span>
                          <div className="text-[10px] text-slate-400 font-mono">Stress</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Directives in this Region */}
                {regionAlerts.length > 0 && (
                  <div className="pt-2 border-t border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-rose-700 font-bold flex items-center space-x-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Active Administrative Directives ({regionAlerts.length})</span>
                      </h4>
                      <button
                        onClick={() => setActiveTab('alerts')}
                        className="text-xs text-rose-700 font-semibold hover:underline"
                      >
                        Manage in Admin Panel →
                      </button>
                    </div>

                    <div className="space-y-2">
                      {regionAlerts.map((alert) => (
                        <div
                          key={alert.id}
                          className="p-3 bg-rose-50/60 border border-rose-200/80 rounded-xl text-xs flex items-center justify-between"
                        >
                          <div>
                            <div className="font-bold text-rose-950">{alert.speciesName}</div>
                            <div className="text-[11px] text-slate-600">{alert.recommendedAction}</div>
                          </div>
                          <div className="ml-2 flex-shrink-0">
                            <SeverityBadge severity={alert.severity} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
