import React, { useState } from 'react';
import {
  ShieldAlert,
  Compass,
  TreePine,
  BarChart3,
  Layers,
  Info,
  Menu,
  X,
  Globe2,
  Activity,
  Leaf,
  Search,
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, alertCount = 10, regionCount = 8 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Overview', shortLabel: 'Home', icon: Globe2 },
    { id: 'regions', label: 'Regions', icon: Compass },
    { id: 'species', label: 'Species', icon: TreePine },
    { id: 'climate', label: 'Climate', icon: BarChart3 },
    { id: 'satellite', label: 'Satellite', icon: Layers },
    { id: 'alerts', label: 'Alert desk', icon: ShieldAlert, badge: alertCount > 0 ? alertCount : null },
    { id: 'about', label: 'Community', icon: Info },
  ];

  const navigate = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#173b2e] bg-[#06110f]/90 text-[#e7f7eb] shadow-[0_10px_40px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
      <div className="border-b border-white/[0.07] bg-[#081a15] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#86a99a] sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="relative flex h-2 w-2 shrink-0"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d9f99d] opacity-70" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#d9f99d]" /></span>
            <span className="truncate">Pune ecological mission control</span>
          </div>
          <div className="hidden shrink-0 items-center gap-4 font-mono text-[9px] tracking-[0.1em] text-[#678b7a] sm:flex">
            <span>REGIONAL FEED / 18.5204° N</span>
            <span>73.8567° E</span>
            <span className="rounded-full border border-[#2c6b51] bg-[#103426] px-2 py-1 text-[#d9f99d]">{regionCount} zones indexed</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="flex h-[70px] items-center justify-between gap-4">
          <button onClick={() => navigate('home')} className="group flex min-w-0 items-center gap-3 text-left" aria-label="Go to Pune BioWatch overview">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#b2d67b]/30 bg-[#d9f99d] text-[#06110f] shadow-[0_7px_20px_rgba(173,224,101,0.2)] transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-105"><Leaf className="h-5 w-5" strokeWidth={2.5} /></span>
            <span className="min-w-0">
              <span className="flex items-center gap-2"><span className="truncate text-[15px] font-extrabold tracking-[-0.035em] text-white sm:text-[17px]">Pune BioWatch</span><span className="hidden rounded border border-[#285442] bg-[#0d251d] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-[#73e5cf] sm:inline-block">Mission OS</span></span>
              <span className="hidden text-[10px] font-medium text-[#83a396] sm:block">Biodiversity intelligence for Pune</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 rounded-2xl border border-[#183b2e] bg-[#0a1d17]/90 p-1 xl:flex" aria-label="Primary navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative flex items-center gap-1.5 rounded-xl px-3 py-2 text-[11px] font-bold transition-all duration-200 ${isActive ? 'bg-[#d9f99d] text-[#06110f] shadow-[0_5px_16px_rgba(173,224,101,0.15)]' : 'text-[#84a396] hover:bg-[#102d22] hover:text-white'}`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-[#0a3d2e]' : 'text-[#5d8b77]'}`} />
                  <span>{item.label}</span>
                  {item.badge && <span className={`ml-0.5 min-w-4 rounded-full px-1 py-0.5 text-center text-[9px] leading-none ${isActive ? 'bg-[#0a3d2e] text-[#d9f99d]' : 'bg-[#542b2a] text-[#ffad9b]'}`}>{item.badge}</span>}
                </button>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden items-center gap-2 rounded-xl border border-[#183b2e] bg-[#0a1d17] px-3 py-2 text-[10px] font-bold text-[#7e9e91] lg:flex"><Activity className="h-3.5 w-3.5 text-[#73e5cf]" /><span>Model feed nominal</span></div>
            <button onClick={() => setMobileMenuOpen((open) => !open)} className="rounded-xl border border-[#21483a] bg-[#0a1d17] p-2.5 text-[#9cc0af] transition-colors hover:border-[#73e5cf]/50 hover:bg-[#102d22] xl:hidden" aria-label="Toggle navigation menu" aria-expanded={mobileMenuOpen}>{mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-[#173b2e] bg-[#071713] px-4 py-3 shadow-xl xl:hidden sm:px-6">
          <div className="mx-auto mb-3 flex items-center gap-2 rounded-xl border border-[#1c4435] bg-[#0b2119] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#73e5cf]"><Search className="h-3.5 w-3.5" /> Navigate the observatory</div>
          <nav className="mx-auto grid max-w-[1440px] grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button key={item.id} onClick={() => navigate(item.id)} aria-current={isActive ? 'page' : undefined} className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-xs font-bold transition-colors ${isActive ? 'border-[#b2d67b]/50 bg-[#d9f99d] text-[#06110f]' : 'border-[#1b3a2e] bg-[#0b2119] text-[#93b3a4] hover:border-[#73e5cf]/45 hover:bg-[#102d22]'}`}>
                  <Icon className={`h-4 w-4 ${isActive ? 'text-[#0a3d2e]' : 'text-[#5d8b77]'}`} /><span className="flex-1">{item.shortLabel || item.label}</span>{item.badge && <span className="rounded-full bg-[#542b2a] px-1.5 py-0.5 text-[9px] text-[#ffad9b]">{item.badge}</span>}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
