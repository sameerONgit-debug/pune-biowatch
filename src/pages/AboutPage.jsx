import React, { useState } from 'react';
import {
  Info,
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
  Users,
  ShieldCheck,
  BookOpen,
  MapPin,
  Calendar,
  Eye,
} from 'lucide-react';
import { StatusBadge } from '../components/common/Badge';

export default function AboutPage({
  regions = [],
  species = [],
  sightings = [],
  onSubmitSighting,
}) {
  const [formData, setFormData] = useState({
    observerName: '',
    observerEmail: '',
    regionId: regions[0]?.id || '',
    speciesId: species[0]?.id || '',
    date: new Date().toISOString().slice(0, 10),
    locationDescription: '',
    observedBehavior: '',
    stressLevel: 'Moderate',
    count: 1,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.observerName.trim()) errs.observerName = 'Observer name is required';
    if (!formData.observerEmail.trim()) {
      errs.observerEmail = 'Contact email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.observerEmail)) {
      errs.observerEmail = 'Please provide a valid email address';
    }
    if (!formData.regionId) errs.regionId = 'Please select a Pune sub-region';
    if (!formData.date) errs.date = 'Date of observation is required';
    if (!formData.observedBehavior.trim()) {
      errs.observedBehavior = 'Observation notes / climate stress details are required';
    } else if (formData.observedBehavior.trim().length < 10) {
      errs.observedBehavior = 'Please describe the sighting in at least 10 characters';
    }
    if (formData.count < 1) errs.count = 'Count must be at least 1';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      const selectedRegionObj = regions.find((r) => r.id === formData.regionId);
      const selectedSpeciesObj = species.find((s) => s.id === formData.speciesId);

      const payload = {
        ...formData,
        regionName: selectedRegionObj ? selectedRegionObj.name : formData.regionId,
        speciesName: selectedSpeciesObj ? selectedSpeciesObj.commonName : formData.speciesId,
      };

      const res = await onSubmitSighting(payload);
      setSubmissionSuccess(res.data || res);

      // Reset form
      setFormData({
        observerName: '',
        observerEmail: '',
        regionId: regions[0]?.id || '',
        speciesId: species[0]?.id || '',
        date: new Date().toISOString().slice(0, 10),
        locationDescription: '',
        observedBehavior: '',
        stressLevel: 'Moderate',
        count: 1,
      });
      setErrors({});
    } catch (err) {
      console.error('Submission error:', err);
      setErrors({ form: err.message || 'Failed to submit sighting. Please check inputs.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Platform Mission & Academic Disclaimer Header */}
      <div className="surface space-y-5 p-6 sm:p-8">
        <div className="eyebrow"><BookOpen className="h-3.5 w-3.5" /> About the Pune BioWatch initiative</div>
        <h1 className="page-title max-w-4xl">
          Connecting Regional Climate Science with Local Biodiversity Action
        </h1>
        <p className="page-subtitle max-w-4xl">
          Pune BioWatch was created as a modern, data-driven environmental platform to bridge the gap between regional meteorological data and community biodiversity conservation. Pune district is home to unique ecological interfaces: the biodiversity-rich crests of the Western Ghats (a global biodiversity hotspot), freshwater lake systems along Ramnadi and Mula-Mutha, and rapidly expanding urban centers.
        </p>

        {/* Academic Project Disclaimer Banner */}
        <div className="space-y-1 rounded-2xl border border-[#6b552e] bg-[#2b2117] p-4 text-xs leading-relaxed text-[#f1d9a1]">
          <div className="font-bold flex items-center space-x-1.5 text-[#ffd184]">
            <Info className="w-4 h-4 text-[#ffd184]" />
            <span>Academic & Community Engagement Project Notice</span>
          </div>
          <p>
            This web application is developed for educational, research demonstration, and community engagement purposes. Open-Meteo weather/archive records, GBIF occurrence counts, and NASA Worldview scenes are fetched where available. Species vulnerability profiles, regional scores, alert queue entries, and interpretation notes are curated context—not live sensor measurements or automated species-response conclusions.
          </p>
        </div>
      </div>

      {/* Two Columns: Sighting Submission Form & Data Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Citizen Science "Report a Sighting" Form (7 cols) */}
        <div className="surface space-y-6 p-6 sm:p-8 lg:col-span-7">
          <div className="border-b border-[#193d2f] pb-4">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#73e5cf] font-bold">
              <Users className="w-4 h-4 text-[#73e5cf]" />
              <span>Citizen Science Participation</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Report a Regional Biodiversity Sighting
            </h2>
            <p className="text-xs text-[#82a094]">
              Contribute your field observations from Pune’s hills, lakes, or university groves. Help researchers track species response to heat, drought, and habitat changes.
            </p>
          </div>

          {/* Success receipt */}
          {submissionSuccess && (
            <div className="p-4 rounded-xl bg-[#102d22] border border-[#285442] text-[#ccebd7] text-xs space-y-2 animate-in fade-in">
              <div className="flex items-center space-x-2 font-bold text-[#9ee7b8] text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#73e5cf]" />
                <span>Field Observation Successfully Logged!</span>
              </div>
              <p>
                Reference ID: <span className="font-mono font-bold">{submissionSuccess.id}</span>. Your observation of{' '}
                <span className="font-semibold">{submissionSuccess.speciesName}</span> at{' '}
                <span className="font-semibold">{submissionSuccess.regionName}</span> has been stored for verification.
              </p>
              <button
                onClick={() => setSubmissionSuccess(null)}
                className="text-[11px] font-bold text-[#73e5cf] underline"
              >
                Log another observation
              </button>
            </div>
          )}

          {errors.form && (
            <div className="p-3 bg-[#351f20] border border-[#743e39] rounded-xl text-xs text-[#ffb0a0] flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errors.form}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#c8ddd0] font-semibold mb-1">
                  Observer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ananya Deshpande"
                  value={formData.observerName}
                  onChange={(e) => setFormData({ ...formData, observerName: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.observerName ? 'border-[#ff9884] bg-[#351f20]' : 'border-slate-300'
                  }`}
                />
                {errors.observerName && (
                  <p className="text-[11px] text-[#ff9d8a] mt-1">{errors.observerName}</p>
                )}
              </div>

              <div>
                <label className="block text-[#c8ddd0] font-semibold mb-1">
                  Observer Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="e.g. ananya@unipune.ac.in"
                  value={formData.observerEmail}
                  onChange={(e) => setFormData({ ...formData, observerEmail: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.observerEmail ? 'border-[#ff9884] bg-[#351f20]' : 'border-slate-300'
                  }`}
                />
                {errors.observerEmail && (
                  <p className="text-[11px] text-[#ff9d8a] mt-1">{errors.observerEmail}</p>
                )}
              </div>
            </div>

            {/* Row 2: Region & Species */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#c8ddd0] font-semibold mb-1">
                  Pune Sub-Region <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.regionId}
                  onChange={(e) => setFormData({ ...formData, regionId: e.target.value })}
                  className="input-control"
                >
                  {regions.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#c8ddd0] font-semibold mb-1">
                  Observed Species
                </label>
                <select
                  value={formData.speciesId}
                  onChange={(e) => setFormData({ ...formData, speciesId: e.target.value })}
                  className="input-control"
                >
                  {species.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.commonName} ({s.scientificName})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Date, Count & Stress Level */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[#c8ddd0] font-semibold mb-1">
                  Date of Sighting <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="input-control"
                />
              </div>

              <div>
                <label className="block text-[#c8ddd0] font-semibold mb-1">
                  Estimated Count
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.count}
                  onChange={(e) => setFormData({ ...formData, count: e.target.value })}
                  className="input-control"
                />
              </div>

              <div>
                <label className="block text-[#c8ddd0] font-semibold mb-1">
                  Observed Stress Level
                </label>
                <select
                  value={formData.stressLevel}
                  onChange={(e) => setFormData({ ...formData, stressLevel: e.target.value })}
                  className="input-control"
                >
                  <option value="Low">Low (Normal Feeding)</option>
                  <option value="Moderate">Moderate (Restless/Searching Water)</option>
                  <option value="High">High (Severe Heat/Displaced)</option>
                  <option value="Critical">Critical (Injured/Prostrate)</option>
                </select>
              </div>
            </div>

            {/* Row 4: Exact Location Notes */}
            <div>
              <label className="block text-[#c8ddd0] font-semibold mb-1">
                Specific Location Details (Landmark, Trail, or GPS)
              </label>
              <input
                type="text"
                placeholder="e.g. Vetal Tekdi ARAI trail near water trough #2"
                value={formData.locationDescription}
                onChange={(e) => setFormData({ ...formData, locationDescription: e.target.value })}
                className="input-control"
              />
            </div>

            {/* Row 5: Observed Behavior / Climate Stress */}
            <div>
              <label className="block text-[#c8ddd0] font-semibold mb-1">
                Field Observation Notes & Stress Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Describe behavior, health condition, microhabitat moisture, heat distress, or invasive plant encirclement..."
                value={formData.observedBehavior}
                onChange={(e) => setFormData({ ...formData, observedBehavior: e.target.value })}
                className={`w-full px-3 py-2 rounded-xl border bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.observedBehavior ? 'border-[#ff9884] bg-[#351f20]' : 'border-slate-300'
                }`}
              />
              {errors.observedBehavior && (
                <p className="text-[11px] text-[#ff9d8a] mt-1">{errors.observedBehavior}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-3 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Recording Sighting...' : 'Submit Sighting for Scientific Verification'}</span>
            </button>
          </form>
        </div>

        {/* Right Col: Verified Community Sightings Feed & Citations (5 cols) */}
        <div className="space-y-6 lg:col-span-5">
          {/* Community Sightings Feed */}
          <div className="surface space-y-4 p-6">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono uppercase text-[#82a094] font-bold">
                Recent Citizen Observations ({sightings.length})
              </div>
              <span className="text-[10px] bg-emerald-100 text-[#9ee7b8] font-bold px-2 py-0.5 rounded">
                Recent submissions
              </span>
            </div>

            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {sightings.map((s) => (
                <div
                  key={s.id}
                  className="surface-subtle space-y-1.5 p-3 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{s.speciesName}</span>
                    <StatusBadge status={s.status} />
                  </div>
                  <div className="text-[11px] text-[#73e5cf] flex items-center space-x-1 font-medium">
                    <MapPin className="w-3 h-3" />
                    <span>{s.regionName}</span>
                    <span className="text-slate-400 font-mono text-[10px]">({s.date})</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    "{s.observedBehavior}"
                  </p>
                  <div className="text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-200 flex justify-between">
                    <span>Observer: {s.observerName}</span>
                    <span>Count: {s.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Institutional Partners & Frameworks */}
          <div className="surface space-y-3 p-6">
            <div className="text-xs font-mono uppercase text-slate-400 font-bold">
              Research & Institutional Affiliations
            </div>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#73e5cf] flex-shrink-0 mt-0.5" />
                <span>
                  <b>Maharashtra Forest Department:</b> Wildlife Conservation Strategy (2021–2030) Guidelines.
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#73e5cf] flex-shrink-0 mt-0.5" />
                <span>
                  <b>India Meteorological Department (IMD):</b> Regional Meteorological Centre Pune Climatological Normals.
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#73e5cf] flex-shrink-0 mt-0.5" />
                <span>
                  <b>IUCN Species Survival Commission:</b> Western Ghats Freshwater & Amphibian Assessments.
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#73e5cf] flex-shrink-0 mt-0.5" />
                <span>
                  <b>Live public feeds:</b> Open-Meteo weather/archive, GBIF occurrence search, and NASA Worldview/GIBS imagery; requests are keyless and retain an offline fallback.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
