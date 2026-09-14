import React from 'react';
import ClimateCharts from '../components/climate/ClimateCharts';
import { BarChart3, CloudRain, Flame, Wind } from 'lucide-react';

export default function ClimateDashboardPage({ climateData }) {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="surface p-6 sm:p-8">
        <div className="eyebrow"><BarChart3 className="h-3.5 w-3.5" /> Meteorological observatory · derived pressure proxy</div>
        <h1 className="page-title">
          Pune District Climate Observations & Pressure Proxy
        </h1>
        <p className="page-subtitle max-w-3xl">
          Daily weather observations from Open-Meteo’s public archive are paired with a clearly labelled climate-pressure proxy. The proxy describes weather conditions only; it is not a measured biodiversity-stress or species-response model.
        </p>
      </div>

      {/* Climate Charts Component */}
      <ClimateCharts climateData={climateData} />

      {/* Pune District Climatology Brief */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="surface space-y-3 p-5">
          <div className="flex items-center space-x-2 text-rose-600 font-bold text-xs uppercase font-mono">
            <Flame className="w-4 h-4" />
            <span>Pre-Monsoon Thermal Spikes</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Urban Heat Island & Thermal Prostration
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Inspect the observed heat-day series in the chart above for the selected period. Any effect on bats or nocturnal reptiles requires field observations; this dashboard does not infer species response from temperature alone.
          </p>
        </div>

        <div className="surface space-y-3 p-5">
          <div className="flex items-center space-x-2 text-blue-600 font-bold text-xs uppercase font-mono">
            <CloudRain className="w-4 h-4" />
            <span>Monsoon Precipitation Volatility</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Erratic Cloudbursts vs Extended Dry Breaks
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            The archive-derived monthly and dry-spell series show how rainfall is distributed across the year. The ecological interpretation is a monitoring hypothesis, not a causal finding from this weather feed.
          </p>
        </div>

        <div className="surface space-y-3 p-5">
          <div className="flex items-center space-x-2 text-emerald-600 font-bold text-xs uppercase font-mono">
            <Wind className="w-4 h-4" />
            <span>Western Ghats Orographic Buffer</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Montane Cloud-Forest Disruption
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Regional habitat descriptions remain curated context from the bundled monitoring profiles. They are shown alongside live weather where available, but are not live cloud-base, mist or forest-canopy measurements.
          </p>
        </div>
      </div>
    </div>
  );
}
