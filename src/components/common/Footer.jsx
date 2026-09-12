import React from 'react';
import { Shield, BookOpen, Heart, Award, ExternalLink, Leaf } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-sm mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Platform Overview */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🌿</span>
              <span className="text-lg font-bold text-white tracking-tight">Pune BioWatch</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              An open community engagement and biodiversity decision-support platform dedicated to Pune District, Maharashtra. Synthesizing microclimate variations, satellite land-use change, and species vulnerability metrics.
            </p>
            <div className="text-xs text-emerald-400 font-mono flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Pune Metropolitan Ecological Observatory</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
              Core Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('regions')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Pune Sub-Region Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('species')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Species Vulnerability Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('climate')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  10-Year Climate Anomalies
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('satellite')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Satellite Decadal Change Slider
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('alerts')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Administration Alert Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('about')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Report a Field Sighting
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Data Sources & Acknowledgments */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
              Institutional Data Sources
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start space-x-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span>India Meteorological Department (IMD Pune - Shivajinagar)</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Maharashtra State Forest Department (Wildlife & Territorial)</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span>IUCN Red List of Threatened Species (Western Ghats Assessment)</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span>ESA Sentinel-2 & USGS Landsat Decadal Imagery Archives</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Savitribai Phule Pune University (SPPU) Department of Environmental Science</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Project Scope & Academic Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
              Scope & Academic Notice
            </h4>
            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 leading-relaxed">
              <p className="font-semibold text-emerald-400 mb-1">Academic & Illustrative Use</p>
              This application was engineered as a comprehensive academic and community engagement project. Datasets, satellite composites, and climate indicators represent validated regional trends synthesized for demonstration, planning simulation, and public awareness.
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-4 md:space-y-0 font-mono">
          <div>
            © 2024 Pune BioWatch Initiative. Developed for Pune District Biodiversity & Conservation Research.
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              <span>Public Environmental Asset</span>
            </span>
            <span>•</span>
            <span className="text-emerald-400">Maharashtra Eco-Region #MH-12</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
