import React from 'react';
import HeroSection from '../components/home/HeroSection';
import StatsBanner from '../components/home/StatsBanner';
import PuneLeafletMap from '../components/map/PuneLeafletMap';
import SpeciesCard from '../components/species/SpeciesCard';
import { SeverityBadge } from '../components/common/Badge';
import {
  ArrowRight,
  Compass,
  Droplets,
  Flame,
  MapPin,
  ShieldAlert,
  TreePine,
} from 'lucide-react';

export default function HomePage({
  regions = [],
  species = [],
  alerts = [],
  sightings = [],
  climateData = null,
  setActiveTab,
  onSelectRegion,
  onSelectSpecies,
}) {
  const urgentAlert = alerts.find((a) => a.severity === 'Critical') || alerts[0];
  const criticalAlerts = alerts.filter((a) => a.severity === 'Critical').slice(0, 3);
  const featuredSpecies = species
    .filter((s) => s.climateSeverity === 'Critical' || s.severityScore >= 85)
    .slice(0, 3);

  const handleMapSelectRegion = (region) => {
    onSelectRegion(region);
    setActiveTab('regions');
  };

  return (
    <div className="space-y-12">
      <HeroSection setActiveTab={setActiveTab} urgentAlert={urgentAlert} />

      <StatsBanner
        speciesCount={species.length}
        regionsCount={regions.length}
        alertsCount={alerts.length}
        criticalAlertsCount={criticalAlerts.length}
        sightingsCount={sightings.length}
        tempRise={climateData?.districtOverview?.decadeAvgTempRise || '+1.42°C'}
      />

      <section className="surface p-5 sm:p-7">
        <div className="flex flex-col justify-between gap-5 border-b border-[#e7eee6] pb-6 md:flex-row md:items-end">
          <div>
            <div className="eyebrow"><Compass className="h-3.5 w-3.5" /> Spatial monitoring grid</div>
            <h2 className="section-title mt-2">One district, eight ecological stories</h2>
            <p className="section-subtitle max-w-2xl">
              Explore where climate pressure is concentrating across Pune — and open a field dossier for any zone.
            </p>
          </div>
          <button onClick={() => setActiveTab('regions')} className="btn-secondary self-start md:self-auto">
            Open region explorer <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="overflow-hidden rounded-2xl border border-[#dfe8df] shadow-inner">
            <PuneLeafletMap regions={regions} onSelectRegion={handleMapSelectRegion} height="450px" />
          </div>

          <div className="min-h-0">
            <div className="mb-3 flex items-end justify-between gap-3">
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#7b8d80]">Monitored zones</div>
                <div className="mt-1 text-sm font-bold text-[#1a3429]">Jump to a field area</div>
              </div>
              <span className="rounded-full bg-[#edf7ed] px-2 py-1 text-[10px] font-bold text-[#347255]">{regions.length} live</span>
            </div>
            <div className="max-h-[410px] space-y-2 overflow-y-auto pr-1">
              {regions.map((reg) => {
                const score = reg.metrics?.vulnerabilityScore || 0;
                const scoreClass = score >= 85 ? 'bg-[#fce9e4] text-[#b45143]' : score >= 75 ? 'bg-[#fbf1dc] text-[#9d6b25]' : 'bg-[#e6f5e8] text-[#237653]';
                return (
                  <button
                    key={reg.id}
                    onClick={() => handleMapSelectRegion(reg)}
                    className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-[#e6eee5] bg-[#f8fbf7] p-3 text-left transition-all hover:-translate-y-0.5 hover:border-[#b7d5bc] hover:bg-[#f0f8ef] hover:shadow-sm"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-[#5d8b6d] shadow-sm ring-1 ring-[#e5eee5]"><MapPin className="h-3.5 w-3.5" /></span>
                      <span className="min-w-0">
                        <span className="block truncate text-xs font-bold text-[#243c30] group-hover:text-[#0e4d3b]">{reg.name}</span>
                        <span className="mt-0.5 block truncate text-[10px] text-[#829286]">{reg.habitatType}</span>
                      </span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className={`inline-flex rounded-lg px-2 py-1 text-xs font-extrabold ${scoreClass}`}>{score}</span>
                      <span className="mt-1 block text-[9px] font-bold uppercase tracking-wider text-[#9aa89e]">risk score</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="eyebrow"><ShieldAlert className="h-3.5 w-3.5" /> Action queue</div>
            <h2 className="section-title mt-2">Signals that need attention</h2>
            <p className="section-subtitle">High-priority thresholds surfaced for local teams and field partners.</p>
          </div>
          <button onClick={() => setActiveTab('alerts')} className="inline-flex items-center gap-1.5 self-start text-xs font-extrabold text-[#277052] transition-colors hover:text-[#0e4d3b] sm:self-auto">
            View all directives ({alerts.length}) <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {criticalAlerts.map((alert) => (
            <button
              key={alert.id}
              onClick={() => setActiveTab('alerts')}
              className="group surface flex flex-col justify-between p-5 text-left transition-all hover:-translate-y-1 hover:border-[#efb0a1] hover:shadow-[0_20px_45px_rgba(171,72,57,0.1)]"
            >
              <span>
                <span className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-bold tracking-wider text-[#9aa89e]">{alert.id}</span>
                  <SeverityBadge severity={alert.severity} />
                </span>
                <span className="mt-4 block text-sm font-extrabold leading-5 text-[#1d3429]">{alert.speciesName}</span>
                <span className="mt-1 block text-[11px] font-bold text-[#347255]">{alert.regionName}</span>
                <span className="mt-4 flex gap-2 rounded-xl border border-[#f0e4df] bg-[#fff9f5] p-3 text-[11px] leading-5 text-[#6e625e]">
                  <Flame className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d27762]" />
                  <span className="line-clamp-3">{alert.recommendedAction}</span>
                </span>
              </span>
              <span className="mt-5 flex items-center justify-between border-t border-[#edf1eb] pt-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#93a097]">
                <span>{alert.dateIssued}</span>
                <span className="text-[#b45143] transition-transform group-hover:translate-x-1">Review signal →</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="eyebrow"><TreePine className="h-3.5 w-3.5" /> Indicator library</div>
            <h2 className="section-title mt-2">Species carrying the clearest signal</h2>
            <p className="section-subtitle">Climate-sensitive taxa help turn a changing landscape into an actionable story.</p>
          </div>
          <button onClick={() => setActiveTab('species')} className="inline-flex items-center gap-1.5 self-start text-xs font-extrabold text-[#277052] transition-colors hover:text-[#0e4d3b] sm:self-auto">
            Browse full library ({species.length}) <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {featuredSpecies.map((sp) => (
            <SpeciesCard key={sp.id} species={sp} onSelect={onSelectSpecies} />
          ))}
        </div>
      </section>

      <section className="surface-dark grid gap-6 overflow-hidden p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="eyebrow !text-[#d5f36b]"><Droplets className="h-3.5 w-3.5" /> Built for the people on the ground</div>
          <h2 className="mt-3 max-w-2xl text-2xl font-extrabold tracking-[-0.04em] text-white sm:text-3xl">See a species, stress signal or habitat change?</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50/65">Add a field observation and help strengthen Pune&apos;s shared ecological picture.</p>
        </div>
        <button onClick={() => setActiveTab('about')} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d5f36b] px-4 py-3 text-xs font-extrabold text-[#0b3028] transition-all hover:-translate-y-0.5 hover:bg-[#e1fb83]">
          Report a sighting <ArrowRight className="h-4 w-4" />
        </button>
      </section>
    </div>
  );
}
