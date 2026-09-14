import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import SpeciesModal from './components/species/SpeciesModal';
import { api } from './services/api';

const HomePage = lazy(() => import('./pages/HomePage'));
const RegionExplorerPage = lazy(() => import('./pages/RegionExplorerPage'));
const SpeciesDatabasePage = lazy(() => import('./pages/SpeciesDatabasePage'));
const ClimateDashboardPage = lazy(() => import('./pages/ClimateDashboardPage'));
const SatelliteViewerPage = lazy(() => import('./pages/SatelliteViewerPage'));
const AdminAlertsPage = lazy(() => import('./pages/AdminAlertsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

const VALID_TABS = ['home', 'regions', 'species', 'climate', 'satellite', 'alerts', 'about'];
const PAGE_TITLES = {
  home: 'Overview',
  regions: 'Region Explorer',
  species: 'Species Library',
  climate: 'Climate Dashboard',
  satellite: 'Satellite Viewer',
  alerts: 'Alert Desk',
  about: 'Community',
};

function getTabFromHash() {
  if (typeof window === 'undefined') return 'home';
  const tab = window.location.hash.replace('#', '');
  return VALID_TABS.includes(tab) ? tab : 'home';
}

function PageLoading() {
  return (
    <div className="surface flex min-h-[420px] flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="h-10 w-10 animate-pulse rounded-xl border border-[#73e5cf]/40 bg-[#73e5cf]/10" />
      <div>
        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#73e5cf]">Loading observatory view</div>
        <p className="mt-2 text-sm text-[#8eaa9d]">Preparing the latest field intelligence.</p>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState(getTabFromHash);
  const [regions, setRegions] = useState([]);
  const [species, setSpecies] = useState([]);
  const [climateData, setClimateData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [sightings, setSightings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [isSpeciesModalOpen, setIsSpeciesModalOpen] = useState(false);

  const handleSetActiveTab = useCallback((tab) => {
    const nextTab = VALID_TABS.includes(tab) ? tab : 'home';
    setActiveTab(nextTab);
    if (typeof window !== 'undefined' && window.location.hash !== `#${nextTab}`) {
      window.history.pushState({ tab: nextTab }, '', `${window.location.pathname}${window.location.search}#${nextTab}`);
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => setActiveTab(getTabFromHash());
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [regRes, spRes, climRes, alrRes, sgtRes] = await Promise.all([
          api.getRegions(),
          api.getSpecies(),
          api.getClimate(),
          api.getAlerts(),
          api.getSightings(),
        ]);

        setRegions(regRes || []);
        setSpecies(spRes || []);
        setClimateData(climRes || null);
        setAlerts(alrRes || []);
        setSightings(sgtRes || []);

        if (regRes?.length > 0) setSelectedRegion(regRes[0]);
      } catch (err) {
        console.error('Failed to load initial data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    setIsSpeciesModalOpen(false);
    document.title = `${PAGE_TITLES[activeTab] || 'Overview'} · Pune BioWatch`;
  }, [activeTab]);

  const handleUpdateAlertStatus = async (alertId, newStatus) => {
    try {
      const updated = await api.updateAlertStatus(alertId, newStatus);
      setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, status: newStatus } : alert)));
      return updated;
    } catch (error) {
      console.error('Alert update failed:', error);
      throw error;
    }
  };

  const handleSubmitSighting = async (sightingPayload) => {
    try {
      const response = await api.submitSighting(sightingPayload);
      const newEntry = response.data || response;
      setSightings((prev) => [newEntry, ...prev]);
      return response;
    } catch (error) {
      console.error('Sighting submit error:', error);
      throw error;
    }
  };

  const handleOpenSpeciesModal = (speciesItem) => {
    setSelectedSpecies(speciesItem);
    setIsSpeciesModalOpen(true);
  };

  const handleSelectRegionFromSpecies = (region) => {
    setSelectedRegion(region);
    handleSetActiveTab('regions');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#06110f] px-6 text-white">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d9f99d] text-3xl shadow-[0_0_0_8px_rgba(217,249,157,0.12)]"><span aria-hidden="true">🌿</span></div>
          <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#d9f99d]">Pune BioWatch</div>
          <h1 className="text-2xl font-extrabold tracking-tight">Preparing your field view</h1>
          <p className="mt-3 text-sm leading-6 text-[#8eaa9d]">Loading Western Ghats habitats, microclimates and community observations.</p>
          <div className="mx-auto mt-7 h-1.5 w-48 overflow-hidden rounded-full bg-white/10"><div className="h-full w-2/3 animate-pulse rounded-full bg-[#d9f99d]" /></div>
        </div>
      </div>
    );
  }

  const activeAlertCount = alerts.filter((alert) => alert.status === 'Pending').length;

  return (
    <div className="dark-app flex min-h-screen flex-col">
      <Navbar activeTab={activeTab} setActiveTab={handleSetActiveTab} alertCount={activeAlertCount} regionCount={regions.length} />

      <main className="site-main mx-auto flex w-full max-w-[1440px] flex-grow px-4 pb-20 pt-7 sm:px-6 lg:px-10">
        <Suspense fallback={<PageLoading />}>
          {activeTab === 'home' && <HomePage regions={regions} species={species} alerts={alerts} sightings={sightings} climateData={climateData} setActiveTab={handleSetActiveTab} onSelectRegion={(region) => { setSelectedRegion(region); handleSetActiveTab('regions'); }} onSelectSpecies={handleOpenSpeciesModal} />}
          {activeTab === 'regions' && <RegionExplorerPage regions={regions} species={species} alerts={alerts} selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} onSelectSpecies={handleOpenSpeciesModal} setActiveTab={handleSetActiveTab} />}
          {activeTab === 'species' && <SpeciesDatabasePage species={species} regions={regions} onSelectSpecies={handleOpenSpeciesModal} onSelectRegion={handleSelectRegionFromSpecies} setActiveTab={handleSetActiveTab} />}
          {activeTab === 'climate' && <ClimateDashboardPage climateData={climateData} />}
          {activeTab === 'satellite' && <SatelliteViewerPage />}
          {activeTab === 'alerts' && <AdminAlertsPage alerts={alerts} onUpdateStatus={handleUpdateAlertStatus} regions={regions} />}
          {activeTab === 'about' && <AboutPage regions={regions} species={species} sightings={sightings} onSubmitSighting={handleSubmitSighting} />}
        </Suspense>
      </main>

      <SpeciesModal species={selectedSpecies} isOpen={isSpeciesModalOpen} onClose={() => setIsSpeciesModalOpen(false)} regions={regions} onSelectRegion={handleSelectRegionFromSpecies} />
      <Footer setActiveTab={handleSetActiveTab} />
    </div>
  );
}
