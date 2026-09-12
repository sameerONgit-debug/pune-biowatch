import React from 'react';
import ClimateCharts from '../components/climate/ClimateCharts';
import { BarChart3, Thermometer, CloudRain, Sun, Flame, Wind, ShieldCheck } from 'lucide-react';

export default function ClimateDashboardPage({ climateData }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2 text-xs font-mono uppercase text-emerald-700 font-bold mb-1">
          <BarChart3 className="w-4 h-4 text-emerald-600" />
          <span>Meteorological & Bio-Correlation Observatory</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          Pune District Climate Trends & Species Stress Analytics
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-3xl">
          Empirical observation of shifting precipitation regimes, extreme pre-monsoon heatwave spikes, and their quantified correlation with biodiversity stress across Pune’s 8 micro-climatic zones.
        </p>
      </div>

      {/* Climate Charts Component */}
      <ClimateCharts climateData={climateData} />

      {/* Pune District Climatology Brief */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center space-x-2 text-rose-600 font-bold text-xs uppercase font-mono">
            <Flame className="w-4 h-4" />
            <span>Pre-Monsoon Thermal Spikes</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Urban Heat Island & Thermal Prostration
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Metropolitan Pune routinely records afternoon temperatures exceeding 41.5°C during April and May. The expanding concrete footprint limits nocturnal radiative cooling, causing acute heat exhaustion in colonial fruit bats and suppressing nocturnal reptile activity.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center space-x-2 text-blue-600 font-bold text-xs uppercase font-mono">
            <CloudRain className="w-4 h-4" />
            <span>Monsoon Precipitation Volatility</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Erratic Cloudbursts vs Extended Dry Breaks
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            While total seasonal rainfall in Western Ghats zones (Mulshi, Tamhini) remains abundant, precipitation is increasingly concentrated in short, violent cloudburst events followed by 15 to 25-day rainless spells that desiccate delicate amphibian egg clutches.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center space-x-2 text-emerald-600 font-bold text-xs uppercase font-mono">
            <Wind className="w-4 h-4" />
            <span>Western Ghats Orographic Buffer</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Montane Cloud-Forest Disruption
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            High-altitude ridges like Sinhagad and Bhimashankar rely on sustained cloud mist cover during the monsoon. Rising cloud base altitudes and warmer wind trajectories reduce mist persistence, jeopardizing epiphyte flora and tree fern groves.
          </p>
        </div>
      </div>
    </div>
  );
}
