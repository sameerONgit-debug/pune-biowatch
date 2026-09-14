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
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, alertCount = 10 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Overview', shortLabel: 'Home', icon: Globe2 },
    { id: 'regions', label: 'Regions', icon: Compass },
    { id: 'species', label: 'Species', icon: TreePine },
    { id: 'climate', label: 'Climate', icon: BarChart3 },
    { id: 'satellite', label: 'Satellite', icon: Layers },
    {
      id: 'alerts',
      label: 'Alert desk',
      icon: ShieldAlert,
      badge: alertCount > 0 ? alertCount : null,
    },
    { id: 'about', label: 'Community', icon: Info },
  ];

  const navigate = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#dbe8dc]/80 bg-[#f3f6f0]/90 text-[#14231d] shadow-[0_8px_28px_rgba(18,55,38,0.07)] backdrop-blur-xl">
      <div className="border-b border-[#dbe8dc]/80 bg-[#0b3028] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-100/75 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d5f36b] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d5f36b]" />
            </span>
            <span className="truncate">Pune Metropolitan Ecological Observatory</span>
          </div>
          <div className="hidden shrink-0 items-center gap-4 font-mono text-[9px] tracking-[0.1em] text-emerald-100/55 sm:flex">
            <span>18.5204° N</span>
            <span>73.8567° E</span>
            <span className="rounded-full bg-white/10 px-2 py-1 text-[#d5f36b]">Live monitoring</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="flex h-[72px] items-center justify-between gap-4">
          <button
            onClick={() => navigate('home')}
            className="group flex min-w-0 items-center gap-3 text-left"
            aria-label="Go to Pune BioWatch overview"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#d5f36b] text-[#0b3028] shadow-[0_7px_18px_rgba(154,183,68,0.28)] transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-105">
              <Leaf className="h-6 w-6" strokeWidth={2.3} />
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-2">
                <span className="truncate text-[15px] font-extrabold tracking-[-0.035em] text-[#12362c] sm:text-[17px]">
                  Pune BioWatch
                </span>
                <span className="hidden rounded-full border border-[#cfe0d2] bg-white/75 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-[#28745a] sm:inline-block">
                  Field OS
                </span>
              </span>
              <span className="hidden text-[10px] font-medium text-[#6a7b71] sm:block">
                Biodiversity & climate intelligence
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 rounded-2xl border border-[#dfe8df] bg-white/65 p-1 xl:flex" aria-label="Primary navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`relative flex items-center gap-1.5 rounded-xl px-3 py-2 text-[11px] font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#0e4d3b] text-white shadow-[0_5px_14px_rgba(14,77,59,0.2)]'
                      : 'text-[#5b7064] hover:bg-[#eef6ee] hover:text-[#0e4d3b]'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-[#d5f36b]' : 'text-[#789184]'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`ml-0.5 min-w-4 rounded-full px-1 py-0.5 text-center text-[9px] leading-none ${isActive ? 'bg-[#d5f36b] text-[#0b3028]' : 'bg-[#fce1db] text-[#b0473c]'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden items-center gap-2 rounded-xl border border-[#dfe8df] bg-white/65 px-3 py-2 text-[10px] font-bold text-[#5b7064] lg:flex">
              <Activity className="h-3.5 w-3.5 text-[#2f9c6c]" />
              <span>8 zones online</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="rounded-xl border border-[#dfe8df] bg-white/75 p-2.5 text-[#315d4c] transition-colors hover:bg-[#eaf4ea] xl:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-[#dbe8dc] bg-[#f8fbf7] px-4 py-3 shadow-lg xl:hidden sm:px-6">
          <nav className="mx-auto grid max-w-[1440px] grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-xs font-bold transition-colors ${
                    isActive
                      ? 'border-[#0e4d3b] bg-[#0e4d3b] text-white'
                      : 'border-[#dfe8df] bg-white text-[#536a5d] hover:border-[#a9c9ae] hover:bg-[#f0f8ef]'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-[#d5f36b]' : 'text-[#729281]'}`} />
                  <span className="flex-1">{item.shortLabel || item.label}</span>
                  {item.badge && <span className="rounded-full bg-[#fce1db] px-1.5 py-0.5 text-[9px] text-[#b0473c]">{item.badge}</span>}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
