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

  const { annualTrends = [], monthlyClimatology = [], regionalComparisons = [], districtOverview = {}, liveWeather = null, dataMeta = {}, periodLabel = '2015–2024' } = climateData;

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
            <span>Period Mean Temp Delta</span>
          </div>
          <div className="text-2xl font-bold text-red-600">{districtOverview.decadeAvgTempRise}</div>
          <div className="text-[11px] text-slate-500 mt-1">{districtOverview.baselinePeriod || 'Bundled baseline'}</div>
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
            <span>Current air temperature</span>
          </div>
          <div className="text-2xl font-bold text-slate-900">{liveWeather?.current?.temperature != null ? `${liveWeather.current.temperature}°C` : '—'}</div>
          <div className="text-[11px] text-slate-500 mt-1">{liveWeather ? 'Open-Meteo current reading' : 'Live reading unavailable'}</div>
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
                : 'text-[#83a396] hover:bg-[#102d22] hover:text-[#d9f99d]'
            }`}
          >
            Annual trend
          </button>
          <button
            onClick={() => setActiveTab('correlation')}
            className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
              activeTab === 'correlation'
                ? 'bg-[#0e4d3b] text-white shadow-sm'
                : 'text-[#83a396] hover:bg-[#102d22] hover:text-[#d9f99d]'
            }`}
          >
            Pressure proxy
          </button>
          <button
            onClick={() => setActiveTab('monthly')}
            className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
              activeTab === 'monthly'
                ? 'bg-[#0e4d3b] text-white shadow-sm'
                : 'text-[#83a396] hover:bg-[#102d22] hover:text-[#d9f99d]'
            }`}
          >
            Monthly cycle
          </button>
          <button
            onClick={() => setActiveTab('regions')}
            className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
              activeTab === 'regions'
                ? 'bg-[#0e4d3b] text-white shadow-sm'
                : 'text-[#83a396] hover:bg-[#102d22] hover:text-[#d9f99d]'
            }`}
          >
            Regional view
          </button>
        </div>

        <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#809087]">
          <Info className="h-3.5 w-3.5 text-slate-400" />
          <span title={dataMeta.note}>{dataMeta.mode === 'live' ? 'Open-Meteo live + archive' : 'Bundled baseline'}</span>
          {dataMeta.sourceUrls?.[0] && <a href={dataMeta.sourceUrls[0]} target="_blank" rel="noreferrer" className="text-[#73e5cf] hover:text-[#d9f99d]">source ↗</a>}
        </div>
      </div>

      {/* CHART 1: Decadal Trends */}
      {activeTab === 'trends' && (
        <div className="surface space-y-4 p-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Pune District Temperature Anomaly & Extreme Heat Days ({periodLabel})
            </h3>
            <p className="text-xs text-slate-500">
              Observed temperature, rainfall and heat-day signal against the selected historical baseline. The heat-day series counts daily maximum temperatures above 40°C.
            </p>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={annualTrends.map((item) => ({ ...item, climatePressureProxy: item.climatePressureProxy ?? item.speciesStressIndex }))} margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1b3a2e" />
                <XAxis dataKey="year" tick={{ fill: '#83a396', fontSize: 12 }} />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  tick={{ fill: '#83a396', fontSize: 12 }}
                  domain={[0, 45]}
                  label={{ value: 'Days / Anomaly (°C * 10)', angle: -90, position: 'insideLeft', fill: '#638478', fontSize: 10 }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: '#83a396', fontSize: 12 }}
                  domain={[400, 1400]}
                  label={{ value: 'Rainfall (mm)', angle: 90, position: 'insideRight', fill: '#638478', fontSize: 10 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />

                <Bar
                  yAxisId="right"
                  dataKey="annualRainfall"
                  name="Annual Rainfall (mm)"
                  fill="#2e7b8b"
                  opacity={0.65}
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="extremeHeatDays"
                  name="Extreme Heat Days (>40°C)"
                  stroke="#ff9884"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#ff9884' }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="tempAnomaly"
                  name="Temp Anomaly (°C)"
                  stroke="#ffd184"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#ffd184' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* CHART 2: Derived climate pressure proxy */}
      {activeTab === 'correlation' && (
        <div className="surface space-y-4 p-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Climate pressure proxy across the selected period
            </h3>
            <p className="text-xs text-slate-500">
              A transparent proxy derived from observed temperature anomalies, heat days and monsoon dry spells. It is not a measured species stress index.
            </p>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={annualTrends.map((item) => ({ ...item, climatePressureProxy: item.climatePressureProxy ?? item.speciesStressIndex }))} margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1b3a2e" />
                <XAxis dataKey="year" tick={{ fill: '#83a396', fontSize: 12 }} />
                <YAxis
                  yAxisId="stress"
                  domain={[40, 100]}
                  tick={{ fill: '#83a396', fontSize: 12 }}
                  label={{ value: 'Climate Pressure Proxy (0-100)', angle: -90, position: 'insideLeft', fill: '#638478', fontSize: 10 }}
                />
                <YAxis
                  yAxisId="spells"
                  orientation="right"
                  domain={[0, 40]}
                  tick={{ fill: '#83a396', fontSize: 12 }}
                  label={{ value: 'Monsoon Dry Spells (Days)', angle: 90, position: 'insideRight', fill: '#638478', fontSize: 10 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />

                <Area
                  yAxisId="stress"
                  type="monotone"
                  dataKey="climatePressureProxy"
                  name="Climate Pressure Proxy"
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
              Pune District Monthly Baseline vs Recent Period
            </h3>
            <p className="text-xs text-slate-500">
              Compare the historical monthly baseline with the latest available observed period from the live archive.
            </p>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyClimatology} margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1b3a2e" />
                <XAxis dataKey="month" tick={{ fill: '#83a396', fontSize: 12 }} />
                <YAxis
                  yAxisId="temp"
                  domain={[15, 38]}
                  tick={{ fill: '#83a396', fontSize: 12 }}
                  label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', fill: '#638478', fontSize: 10 }}
                />
                <YAxis
                  yAxisId="rain"
                  orientation="right"
                  domain={[0, 300]}
                  tick={{ fill: '#83a396', fontSize: 12 }}
                  label={{ value: 'Rainfall (mm)', angle: 90, position: 'insideRight', fill: '#638478', fontSize: 10 }}
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
                  stroke="#638478"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                />
                <Line
                  yAxisId="temp"
                  type="monotone"
                  dataKey="currentTemp"
                  name="Recorded Temp (°C)"
                  stroke="#ff9884"
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
                Regional climate profiles across Pune Sub-Regions
              </h3>
              <p className="text-xs text-slate-500">
                Curated regional baselines, with current weather fields merged from Open-Meteo when available. Ratings are profiles, not live biodiversity measurements.
              </p>
            </div>
            <select
              value={selectedRegionId}
              onChange={(e) => setSelectedRegionId(e.target.value)}
              className="select-control w-auto"
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
                <CartesianGrid strokeDasharray="3 3" stroke="#1b3a2e" />
                <XAxis dataKey="regionName" tick={{ fill: '#83a396', fontSize: 11 }} interval={0} angle={-20} textAnchor="end" />
                <YAxis
                  yAxisId="temp"
                  domain={[25, 45]}
                  tick={{ fill: '#83a396', fontSize: 12 }}
                  label={{ value: 'Peak Summer Temp (°C)', angle: -90, position: 'insideLeft', fill: '#638478', fontSize: 10 }}
                />
                <YAxis
                  yAxisId="stress"
                  orientation="right"
                  domain={[50, 100]}
                  tick={{ fill: '#83a396', fontSize: 12 }}
                  label={{ value: 'Curated Profile (0-100)', angle: 90, position: 'insideRight', fill: '#638478', fontSize: 10 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />

                <Bar
                  yAxisId="temp"
                  dataKey="maxSummerTemp"
                  name="Max Summer Temp (°C)"
                  fill="#ff9f67"
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  yAxisId="stress"
                  type="monotone"
                  dataKey="stressRating"
                  name="Curated Habitat Pressure Profile"
                  stroke="#ff9884"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#ff9884' }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Region Breakdown Cards */}
          <div className="grid grid-cols-1 gap-3 border-t border-[#1b3a2e] pt-4 sm:grid-cols-2 lg:grid-cols-4">
            {regionalComparisons.map((reg) => (
              <div
                key={reg.regionId}
                className="metric-card flex flex-col justify-between text-xs"
              >
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-800">{reg.regionName}</span>
                    <span
                      className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        reg.stressRating >= 85
                          ? 'bg-[#351f20] text-[#ff9d8a] border border-[#743e39]'
                          : reg.stressRating >= 75
                          ? 'bg-[#332b1d] text-[#ffd184] border border-[#6b552e]'
                          : 'bg-[#102d22] text-[#9ee7b8] border border-[#285442]'
                      }`}
                    >
                      Profile {reg.stressRating}
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
