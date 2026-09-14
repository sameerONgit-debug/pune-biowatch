import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import SpeciesModal from './components/species/SpeciesModal';

import HomePage from './pages/HomePage';
import RegionExplorerPage from './pages/RegionExplorerPage';
import SpeciesDatabasePage from './pages/SpeciesDatabasePage';
import ClimateDashboardPage from './pages/ClimateDashboardPage';
import SatelliteViewerPage from './pages/SatelliteViewerPage';
import AdminAlertsPage from './pages/AdminAlertsPage';
import AboutPage from './pages/AboutPage';

import { api } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [regions, setRegions] = useState([]);
  const [species, setSpecies] = useState([]);
  const [climateData, setClimateData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [sightings, setSightings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Deep dive selection states
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [isSpeciesModalOpen, setIsSpeciesModalOpen] = useState(false);

  // Fetch initial data
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

        if (regRes && regRes.length > 0) {
          setSelectedRegion(regRes[0]);
        }
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

    const pageTitles = {
      home: 'Overview',
      regions: 'Region Explorer',
      species: 'Species Library',
      climate: 'Climate Dashboard',
      satellite: 'Satellite Viewer',
      alerts: 'Alert Desk',
      about: 'Community',
    };
    document.title = `${pageTitles[activeTab] || 'Overview'} · Pune BioWatch`;
  }, [activeTab]);

  // Update alert status handler
  const handleUpdateAlertStatus = async (alertId, newStatus) => {
    try {
      const updated = await api.updateAlertStatus(alertId, newStatus);
      setAlerts((prev) =>
        prev.map((a) => (a.id === alertId ? { ...a, status: newStatus } : a))
      );
      return updated;
    } catch (e) {
      console.error('Alert update failed:', e);
      throw e;
    }
  };

  // Submit citizen sighting handler
  const handleSubmitSighting = async (sightingPayload) => {
    try {
      const res = await api.submitSighting(sightingPayload);
      const newEntry = res.data || res;
      setSightings((prev) => [newEntry, ...prev]);
      return res;
    } catch (e) {
      console.error('Sighting submit error:', e);
      throw e;
    }
  };

  const handleOpenSpeciesModal = (sp) => {
    setSelectedSpecies(sp);
    setIsSpeciesModalOpen(true);
  };

  const handleSelectRegionFromSpecies = (reg) => {
    setSelectedRegion(reg);
    setActiveTab('regions');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b3028] flex items-center justify-center px-6 text-white">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d5f36b] text-3xl shadow-[0_0_0_8px_rgba(213,243,107,0.12)]">
            <span aria-hidden="true">🌿</span>
          </div>
          <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#d5f36b]">
            Pune BioWatch
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Preparing your field view</h1>
          <p className="mt-3 text-sm leading-6 text-emerald-100/65">
            Loading Western Ghats habitats, microclimates and community observations.
          </p>
          <div className="mx-auto mt-7 h-1.5 w-48 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-2/3 animate-pulse rounded-full bg-[#d5f36b]" />
          </div>
        </div>
      </div>
    );
  }

  const activeAlertCount = alerts.filter((a) => a.status === 'Pending').length;

  return (
    <div className="dark-app min-h-screen flex flex-col">
      {/* Official Government / Agency Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        alertCount={activeAlertCount}
        regionCount={regions.length}
      />

      {/* Main Content Area */}
      <main className="site-main flex-grow max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-10 pt-7 pb-20">
        {activeTab === 'home' && (
          <HomePage
            regions={regions}
            species={species}
            alerts={alerts}
            sightings={sightings}
            climateData={climateData}
            setActiveTab={setActiveTab}
            onSelectRegion={(reg) => {
              setSelectedRegion(reg);
              setActiveTab('regions');
            }}
            onSelectSpecies={handleOpenSpeciesModal}
          />
        )}

        {activeTab === 'regions' && (
          <RegionExplorerPage
            regions={regions}
            species={species}
            alerts={alerts}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            onSelectSpecies={handleOpenSpeciesModal}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'species' && (
          <SpeciesDatabasePage
            species={species}
            regions={regions}
            onSelectSpecies={handleOpenSpeciesModal}
            onSelectRegion={handleSelectRegionFromSpecies}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'climate' && (
          <ClimateDashboardPage climateData={climateData} />
        )}

        {activeTab === 'satellite' && <SatelliteViewerPage />}

        {activeTab === 'alerts' && (
          <AdminAlertsPage
            alerts={alerts}
            onUpdateStatus={handleUpdateAlertStatus}
            regions={regions}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            regions={regions}
            species={species}
            sightings={sightings}
            onSubmitSighting={handleSubmitSighting}
          />
        )}
      </main>

      {/* Global Species Detail Modal */}
      <SpeciesModal
        species={selectedSpecies}
        isOpen={isSpeciesModalOpen}
        onClose={() => setIsSpeciesModalOpen(false)}
        regions={regions}
        onSelectRegion={handleSelectRegionFromSpecies}
      />

      {/* Official Agency & Academic Disclaimer Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
