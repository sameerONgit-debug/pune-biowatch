import React, { useState, useMemo } from 'react';
import SpeciesCard from '../components/species/SpeciesCard';
import { IUCNBadge, SeverityBadge } from '../components/common/Badge';
import { Search, Filter, LayoutGrid, List, TreePine, Sparkles, MapPin, X } from 'lucide-react';

export default function SpeciesDatabasePage({
  species = [],
  regions = [],
  onSelectSpecies,
  onSelectRegion,
  setActiveTab,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [selectedIUCN, setSelectedIUCN] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  const categories = ['All', 'Mammals', 'Birds', 'Amphibians', 'Reptiles', 'Plants', 'Insects'];
  const severities = ['All', 'Critical', 'High', 'Moderate', 'Medium', 'Low'];
  const iucnStatuses = ['All', 'Critically Endangered', 'Endangered', 'Vulnerable', 'Near Threatened', 'Least Concern'];

  // Map of region IDs to names
  const regionMap = useMemo(() => {
    const map = {};
    regions.forEach((r) => {
      map[r.id] = r.name;
    });
    return map;
  }, [regions]);

  // Filter logic
  const filteredSpecies = useMemo(() => {
    return species.filter((item) => {
      // Search term
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const match =
          item.commonName.toLowerCase().includes(q) ||
          item.scientificName.toLowerCase().includes(q) ||
          (item.marathiName && item.marathiName.toLowerCase().includes(q)) ||
          item.description.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Category
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Region
      if (selectedRegion !== 'All' && !item.regions?.includes(selectedRegion)) {
        return false;
      }

      // Severity
      if (selectedSeverity !== 'All') {
        const target = selectedSeverity.toLowerCase();
        const itemSev = item.climateSeverity.toLowerCase();
        if (target === 'moderate' || target === 'medium') {
          if (itemSev !== 'moderate' && itemSev !== 'medium') return false;
        } else if (itemSev !== target) {
          return false;
        }
      }

      // IUCN
      if (selectedIUCN !== 'All' && item.iucnStatus !== selectedIUCN) {
        return false;
      }

      return true;
    });
  }, [species, searchTerm, selectedCategory, selectedRegion, selectedSeverity, selectedIUCN]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedRegion('All');
    setSelectedSeverity('All');
    setSelectedIUCN('All');
  };

  const hasActiveFilters =
    searchTerm ||
    selectedCategory !== 'All' ||
    selectedRegion !== 'All' ||
    selectedSeverity !== 'All' ||
    selectedIUCN !== 'All';

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="surface flex flex-col gap-5 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="eyebrow"><TreePine className="h-3.5 w-3.5" /> Taxonomic impact directory</div>
          <h1 className="page-title">Pune Regional Species Impact Database</h1>
          <p className="page-subtitle">
            Cataloging 18+ indicator and endemic species across Western Ghats fringe zones, urban wetlands, and dry scrub habitats.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center self-start rounded-xl border border-[#dfe8df] bg-[#eff6ee] p-1 md:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-bold transition-all ${
              viewMode === 'grid'
                ? 'bg-[#0e4d3b] text-white shadow-sm'
                : 'text-[#607369] hover:text-[#0e4d3b]'
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="hidden sm:inline">Cards</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-bold transition-all ${
              viewMode === 'table'
                ? 'bg-[#0e4d3b] text-white shadow-sm'
                : 'text-[#607369] hover:text-[#0e4d3b]'
            }`}
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">Table</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="surface space-y-5 p-5 sm:p-6">
        {/* Search & Main Row */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by common name, scientific name, Marathi name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-control pl-10 pr-4"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 text-xs text-rose-600 hover:text-rose-700 font-semibold border border-rose-200 hover:bg-rose-50 rounded-xl transition-colors flex items-center space-x-1 self-start md:self-auto"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
          {/* Category */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-400 font-bold mb-1">
              Class / Taxa
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select-control"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Region */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-400 font-bold mb-1">
              Habitat Sub-Region
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="select-control"
            >
              <option value="All">All Pune Sub-Regions</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Climate Severity */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-400 font-bold mb-1">
              Climate Vulnerability
            </label>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="select-control"
            >
              {severities.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* IUCN Status */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-400 font-bold mb-1">
              IUCN Red List Status
            </label>
            <select
              value={selectedIUCN}
              onChange={(e) => setSelectedIUCN(e.target.value)}
              className="select-control"
            >
              {iucnStatuses.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-slate-500 font-mono pt-2 border-t border-slate-100">
          <span>Showing {filteredSpecies.length} of {species.length} tracked species</span>
          <span>Pune Basin Bio-Inventory</span>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpecies.length === 0 ? (
            <div className="surface col-span-full p-12 text-center text-slate-500">
              <TreePine className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p className="font-bold text-slate-700">No species match your active filters</p>
              <button
                onClick={clearFilters}
                className="mt-3 text-xs text-emerald-700 font-semibold underline"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredSpecies.map((sp) => (
              <SpeciesCard
                key={sp.id}
                species={sp}
                regionMap={regionMap}
                onSelect={(item) => onSelectSpecies(item)}
              />
            ))
          )}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table w-full text-left text-xs text-slate-600">
              <thead className="bg-[#103d32] text-emerald-50/75 font-mono uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-4 py-3.5">Taxa / Common Name</th>
                  <th className="px-4 py-3.5">Scientific Name</th>
                  <th className="px-4 py-3.5">IUCN Status</th>
                  <th className="px-4 py-3.5">Climate Severity</th>
                  <th className="px-4 py-3.5 text-center">Score</th>
                  <th className="px-4 py-3.5">Pune Habitats</th>
                  <th className="px-4 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredSpecies.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                      No matching species found.
                    </td>
                  </tr>
                ) : (
                  filteredSpecies.map((sp) => (
                    <tr key={sp.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-900">
                        <div>{sp.commonName}</div>
                        <div className="text-[10px] text-slate-400 font-mono uppercase">
                          {sp.category}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-serif italic text-slate-600">
                        {sp.scientificName}
                      </td>
                      <td className="px-4 py-3">
                        <IUCNBadge status={sp.iucnStatus} />
                      </td>
                      <td className="px-4 py-3">
                        <SeverityBadge severity={sp.climateSeverity} />
                      </td>
                      <td className="px-4 py-3 text-center font-mono font-bold text-slate-800">
                        {sp.severityScore}
                      </td>
                      <td className="px-4 py-3 max-w-xs truncate text-[11px] text-slate-500">
                        {sp.regions?.map((rId) => regionMap[rId] || rId).join(', ')}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => onSelectSpecies(sp)}
                          className="rounded-lg bg-[#0e4d3b] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#092f27]"
                        >
                          Dossier
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
