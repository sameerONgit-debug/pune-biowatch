import React from 'react';
import { AlertTriangle, ArrowUpRight, MapPin, TrendingUp, TreePine, Users } from 'lucide-react';

export default function StatsBanner({ speciesCount = 18, regionsCount = 8, alertsCount = 10, criticalAlertsCount = 4, sightingsCount = 3, tempRise = '+1.42°C', setActiveTab }) {
  const stats = [
    { label: 'Indicator species', value: speciesCount, sub: 'Across 5 taxonomic classes', icon: TreePine, tone: 'text-[#d9f99d] bg-[#b8e37b]/10 border-[#b8e37b]/20', target: 'species' },
    { label: 'Monitored habitats', value: regionsCount, sub: 'Ghats edge to city wetlands', icon: MapPin, tone: 'text-[#73e5cf] bg-[#73e5cf]/10 border-[#73e5cf]/20', target: 'regions' },
    { label: 'Open directives', value: alertsCount, sub: `${criticalAlertsCount} critical thresholds`, icon: AlertTriangle, tone: 'text-[#ff9884] bg-[#ff9884]/10 border-[#ff9884]/20', target: 'alerts' },
    { label: 'Temperature anomaly', value: tempRise, sub: 'vs 1981–2010 baseline', icon: TrendingUp, tone: 'text-[#ffd184] bg-[#ffd184]/10 border-[#ffd184]/20', target: 'climate' },
    { label: 'Community reports', value: sightingsCount, sub: 'Field observations submitted', icon: Users, tone: 'text-[#b9b5ff] bg-[#b9b5ff]/10 border-[#b9b5ff]/20', target: 'about' },
  ];

  return (
    <section aria-label="Pune BioWatch at a glance">
      <div className="mb-3 flex items-center justify-between gap-4"><div className="eyebrow"><span className="font-mono">01</span> District telemetry</div><span className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-[#668579] sm:block">Live from observatory feed · 09:42 IST</span></div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return <button key={stat.label} type="button" onClick={() => setActiveTab?.(stat.target)} aria-label={`Open ${stat.label}`} className="stat-card group min-h-[142px] w-full">
            <div className="relative z-[1] flex items-start justify-between gap-2"><span className="max-w-[10rem] text-[10px] font-extrabold uppercase leading-4 tracking-[0.12em] text-[#78968a]">{stat.label}</span><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${stat.tone}`}><Icon className="h-4 w-4" /></span></div>
            <div className="relative z-[1] mt-5 flex items-end justify-between gap-2"><div><div className="text-3xl font-extrabold tracking-[-0.06em] text-[#f1faf4]">{stat.value}</div><div className="mt-1 text-[10px] font-medium leading-4 text-[#77978a]">{stat.sub}</div></div><ArrowUpRight className="mb-1 h-4 w-4 text-[#3b6753] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#d9f99d]" /></div>
          </button>;
        })}
      </div>
    </section>
  );
}
