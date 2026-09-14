import React from 'react';
import { AlertTriangle, MapPin, TrendingUp, TreePine, Users } from 'lucide-react';

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
      label: 'Indicator species',
      value: speciesCount,
      sub: 'Across 5 taxonomic classes',
      icon: TreePine,
      tone: 'text-[#237653] bg-[#e6f5e8]',
    },
    {
      label: 'Monitored habitats',
      value: regionsCount,
      sub: 'Ghats edge to city wetlands',
      icon: MapPin,
      tone: 'text-[#306d93] bg-[#e7f2f8]',
    },
    {
      label: 'Open directives',
      value: alertsCount,
      sub: `${criticalAlertsCount} critical thresholds`,
      icon: AlertTriangle,
      tone: 'text-[#b45143] bg-[#fce9e4]',
    },
    {
      label: 'Temperature anomaly',
      value: tempRise,
      sub: 'vs 1981–2010 baseline',
      icon: TrendingUp,
      tone: 'text-[#9d6b25] bg-[#fbf1dc]',
    },
    {
      label: 'Community reports',
      value: sightingsCount,
      sub: 'Field observations submitted',
      icon: Users,
      tone: 'text-[#6670a3] bg-[#ececfa]',
    },
  ];

  return (
    <section aria-label="Pune BioWatch at a glance">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="eyebrow">District pulse</div>
        <span className="hidden text-[10px] font-bold uppercase tracking-[0.16em] text-[#829286] sm:block">Updated from current observatory feed</span>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="stat-card min-h-[142px]">
              <div className="relative z-[1] flex items-start justify-between gap-2">
                <span className="max-w-[10rem] text-[10px] font-extrabold uppercase leading-4 tracking-[0.12em] text-[#718176]">{stat.label}</span>
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${stat.tone}`}>
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <div className="relative z-[1] mt-5">
                <div className="text-3xl font-extrabold tracking-[-0.06em] text-[#14231d]">{stat.value}</div>
                <div className="mt-1 text-[10px] font-medium leading-4 text-[#85938a]">{stat.sub}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
