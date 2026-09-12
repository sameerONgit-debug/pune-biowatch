import React from 'react';
import { TreePine, MapPin, AlertTriangle, TrendingUp, Users, Flame } from 'lucide-react';

export default function StatsBanner({
  speciesCount = 18,
  regionsCount = 8,
  alertsCount = 10,
  criticalAlertsCount = 4,
  sightingsCount = 3,
  tempRise = '+1.42°C',
}) {
  const stats = [
    {
      label: 'Endemic & Indicator Species',
      value: speciesCount,
      sub: '5 taxonomic classes tracked',
      icon: TreePine,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      label: 'Pune Ecological Sub-Regions',
      value: regionsCount,
      sub: 'Sahyadri rim to urban floodplains',
      icon: MapPin,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      label: 'Active Actionable Alerts',
      value: alertsCount,
      sub: `${criticalAlertsCount} critical thresholds breached`,
      icon: AlertTriangle,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
    },
    {
      label: '10-Year Temp Anomaly',
      value: tempRise,
      sub: 'Relative to 1981-2010 baseline',
      icon: TrendingUp,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      label: 'Citizen Science Sightings',
      value: sightingsCount,
      sub: 'Community field reports',
      icon: Users,
      color: 'text-teal-600 bg-teal-50 border-teal-200',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                {stat.label}
              </span>
              <div className={`p-2 rounded-lg border ${stat.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 mt-1 font-medium">{stat.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
