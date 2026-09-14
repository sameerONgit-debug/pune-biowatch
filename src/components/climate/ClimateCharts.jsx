import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';
import { Thermometer, CloudRain, AlertTriangle, TrendingUp, Info } from 'lucide-react';

export default function ClimateCharts({ climateData }) {
  const [activeTab, setActiveTab] = useState('trends'); // 'trends', 'correlation', 'monthly', 'regions'
  const [selectedRegionId, setSelectedRegionId] = useState('all');

  if (!climateData) {
    return <div className="p-8 text-center text-slate-500">Loading climate records...</div>;
  }

  const { annualTrends = [], monthlyClimatology = [], regionalComparisons = [], districtOverview = {} } =
    climateData;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 text-white p-3 rounded-lg border border-slate-700 shadow-xl text-xs font-mono">
          <p className="font-bold text-emerald-400 mb-1.5">{label}</p>
          {payload.map((item, idx) => (
            <p key={idx} style={{ color: item.color }} className="flex justify-between space-x-4">
              <span>{item.name}:</span>
              <span className="font-bold">{item.value} {item.unit || ''}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-7">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="metric-card">
          <div className="flex items-center space-x-2 text-slate-500 text-xs font-mono mb-1">
            <Thermometer className="w-3.5 h-3.5 text-red-500" />
            <span>10-Yr Mean Temp Rise</span>
          </div>
          <div className="text-2xl font-bold text-red-600">{districtOverview.decadeAvgTempRise}</div>
          <div className="text-[11px] text-slate-500 mt-1">Over 1981-2010 normal</div>
        </div>

        <div className="metric-card">
          <div className="flex items-center space-x-2 text-slate-500 text-xs font-mono mb-1">
            <CloudRain className="w-3.5 h-3.5 text-blue-500" />
            <span>Monsoon Onset Shift</span>
          </div>
          <div className="text-xl font-bold text-blue-700">{districtOverview.monsoonOnsetShiftDays}</div>
          <div className="text-[11px] text-slate-500 mt-1">Delayed arrival window</div>
        </div>

        <div className="metric-card">
          <div className="flex items-center space-x-2 text-slate-500 text-xs font-mono mb-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>Avg Dry Spell Duration</span>
          </div>
          <div className="text-2xl font-bold text-amber-600">{districtOverview.monsoonDrySpellAverageDays} days</div>
          <div className="text-[11px] text-slate-500 mt-1">Consecutive rainless days</div>
        </div>

        <div className="metric-card">
          <div className="flex items-center space-x-2 text-slate-500 text-xs font-mono mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span>Species Stress Trend</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">+58.6%</div>
          <div className="text-[11px] text-slate-500 mt-1">Index change since 2015</div>
        </div>
      </div>

      {/* Chart Selector Tabs */}
      <div className="surface flex flex-wrap items-center justify-between gap-3 p-2.5">
        <div className="flex space-x-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('trends')}
            className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
              activeTab === 'trends'
                ? 'bg-[#0e4d3b] text-white shadow-sm'
                : 'text-[#607369] hover:bg-[#eef6ee] hover:text-[#0e4d3b]'
            }`}
          >
            Annual trend
          </button>
          <button
            onClick={() => setActiveTab('correlation')}
            className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
              activeTab === 'correlation'
                ? 'bg-[#0e4d3b] text-white shadow-sm'
                : 'text-[#607369] hover:bg-[#eef6ee] hover:text-[#0e4d3b]'
            }`}
          >
            Heat ↔ stress
          </button>
          <button
            onClick={() => setActiveTab('monthly')}
            className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
              activeTab === 'monthly'
                ? 'bg-[#0e4d3b] text-white shadow-sm'
                : 'text-[#607369] hover:bg-[#eef6ee] hover:text-[#0e4d3b]'
            }`}
          >
            Monthly cycle
          </button>
          <button
            onClick={() => setActiveTab('regions')}
            className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
              activeTab === 'regions'
                ? 'bg-[#0e4d3b] text-white shadow-sm'
                : 'text-[#607369] hover:bg-[#eef6ee] hover:text-[#0e4d3b]'
            }`}
          >
            Regional view
          </button>
        </div>

        <div className="flex items-center space-x-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#809087]">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>IMD & Eco-Modeling Data</span>
        </div>
      </div>

      {/* CHART 1: Decadal Trends */}
      {activeTab === 'trends' && (
        <div className="surface space-y-4 p-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Pune District Mean Temperature Anomaly & Extreme Heat Days (2015 – 2024)
            </h3>
            <p className="text-xs text-slate-500">
              Demonstrates consistent positive thermal anomalies above the 25.1°C normal baseline, accompanied by tripling of extreme heat days (&gt;40°C).
            </p>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={annualTrends} margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  domain={[0, 45]}
                  label={{ value: 'Days / Anomaly (°C * 10)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 10 }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  domain={[400, 1400]}
                  label={{ value: 'Rainfall (mm)', angle: 90, position: 'insideRight', fill: '#94a3b8', fontSize: 10 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />

                <Bar
                  yAxisId="right"
                  dataKey="annualRainfall"
                  name="Annual Rainfall (mm)"
                  fill="#93c5fd"
                  opacity={0.65}
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="extremeHeatDays"
                  name="Extreme Heat Days (>40°C)"
                  stroke="#ef4444"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#ef4444' }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="tempAnomaly"
                  name="Temp Anomaly (°C)"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#f59e0b' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* CHART 2: Correlation with Species Stress */}
      {activeTab === 'correlation' && (
        <div className="surface space-y-4 p-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Correlation: Climatic Heat Pressure vs. Composite Species Stress Index
            </h3>
            <p className="text-xs text-slate-500">
              The Species Stress Index integrates mortality events, breeding failures, and range shifts recorded across 18 Pune indicator species. Strong positive correlation ($r = 0.91$) with extreme heat occurrences.
            </p>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={annualTrends} margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis
                  yAxisId="stress"
                  domain={[40, 100]}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  label={{ value: 'Species Stress Index (0-100)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 10 }}
                />
                <YAxis
                  yAxisId="spells"
                  orientation="right"
                  domain={[0, 40]}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  label={{ value: 'Monsoon Dry Spells (Days)', angle: 90, position: 'insideRight', fill: '#94a3b8', fontSize: 10 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />

                <Area
                  yAxisId="stress"
                  type="monotone"
                  dataKey="speciesStressIndex"
                  name="Species Stress Index"
                  stroke="#10b981"
                  fill="#d1fae5"
                  strokeWidth={3}
                />
                <Line
                  yAxisId="spells"
                  type="monotone"
                  dataKey="monsoonDrySpells"
                  name="Monsoon Dry Spell Duration (Days)"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  strokeDasharray="4 4"
                  dot={{ r: 4, fill: '#6366f1' }}
                />
                <Line
                  yAxisId="spells"
                  type="monotone"
                  dataKey="extremeHeatDays"
                  name="Extreme Heat Days"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#f43f5e' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* CHART 3: Monthly Climatology */}
      {activeTab === 'monthly' && (
        <div className="surface space-y-4 p-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Pune District Monthly Normal vs Current Year Precipitation & Temperature
            </h3>
            <p className="text-xs text-slate-500">
              Pre-monsoon heat spikes in April-May trigger thermal stress in urban bat roosts, while irregular post-monsoon rain extends into October.
            </p>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyClimatology} margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis
                  yAxisId="temp"
                  domain={[15, 38]}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 10 }}
                />
                <YAxis
                  yAxisId="rain"
                  orientation="right"
                  domain={[0, 300]}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  label={{ value: 'Rainfall (mm)', angle: 90, position: 'insideRight', fill: '#94a3b8', fontSize: 10 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />

                <Bar
                  yAxisId="rain"
                  dataKey="normalRain"
                  name="Normal Rainfall (mm)"
                  fill="#cbd5e1"
                  opacity={0.8}
                />
                <Bar
                  yAxisId="rain"
                  dataKey="currentRain"
                  name="Recorded Rainfall (mm)"
                  fill="#38bdf8"
                  opacity={0.8}
                />
                <Line
                  yAxisId="temp"
                  type="monotone"
                  dataKey="normalTemp"
                  name="Normal Temp (°C)"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                />
                <Line
                  yAxisId="temp"
                  type="monotone"
                  dataKey="currentTemp"
                  name="Recorded Temp (°C)"
                  stroke="#ef4444"
                  strokeWidth={2.5}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* CHART 4: Regional Comparison */}
      {activeTab === 'regions' && (
        <div className="surface space-y-4 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Microclimate Variation Across Pune Sub-Regions
              </h3>
              <p className="text-xs text-slate-500">
                Comparison of peak summer heat, total monsoon precipitation, and species stress rating.
              </p>
            </div>
            <select
              value={selectedRegionId}
              onChange={(e) => setSelectedRegionId(e.target.value)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-700"
            >
              <option value="all">Compare All 8 Sub-Regions</option>
              {regionalComparisons.map((r) => (
                <option key={r.regionId} value={r.regionId}>
                  {r.regionName}
                </option>
              ))}
            </select>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={
                  selectedRegionId === 'all'
                    ? regionalComparisons
                    : regionalComparisons.filter((r) => r.regionId === selectedRegionId)
                }
                margin={{ top: 20, right: 20, bottom: 40, left: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="regionName" tick={{ fill: '#475569', fontSize: 11 }} interval={0} angle={-20} textAnchor="end" />
                <YAxis
                  yAxisId="temp"
                  domain={[25, 45]}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  label={{ value: 'Peak Summer Temp (°C)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 10 }}
                />
                <YAxis
                  yAxisId="stress"
                  orientation="right"
                  domain={[50, 100]}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  label={{ value: 'Stress Rating (0-100)', angle: 90, position: 'insideRight', fill: '#94a3b8', fontSize: 10 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />

                <Bar
                  yAxisId="temp"
                  dataKey="maxSummerTemp"
                  name="Max Summer Temp (°C)"
                  fill="#f97316"
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  yAxisId="stress"
                  type="monotone"
                  dataKey="stressRating"
                  name="Biodiversity Stress Rating"
                  stroke="#dc2626"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#dc2626' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Region Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
            {regionalComparisons.map((reg) => (
              <div
                key={reg.regionId}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-800">{reg.regionName}</span>
                    <span
                      className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        reg.stressRating >= 85
                          ? 'bg-red-100 text-red-700'
                          : reg.stressRating >= 75
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      Stress {reg.stressRating}
                    </span>
                  </div>
                  <div className="text-slate-500 text-[11px] mb-1.5">
                    Rainfall: <b className="text-slate-700">{reg.monsoonRainfall} mm</b> • UHI: <b className="text-slate-700">{reg.uhiOffset > 0 ? `+${reg.uhiOffset}°C` : `${reg.uhiOffset}°C`}</b>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2">{reg.dominantStress}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
