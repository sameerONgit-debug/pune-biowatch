import React from 'react';
import SatelliteSlider from '../components/satellite/SatelliteSlider';
import { Layers, Eye, ShieldAlert, CheckCircle, Database } from 'lucide-react';

export default function SatelliteViewerPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2 text-xs font-mono uppercase text-emerald-700 font-bold mb-1">
          <Layers className="w-4 h-4 text-emerald-600" />
          <span>Multispectral Land-Cover Analysis</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          Decadal Satellite Earth Observation Viewer
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-3xl">
          Visualizing 10-year ecological transformations across critical Pune hotspots using calibrated Sentinel-2 and Landsat multispectral composites. Drag the interactive slider to examine wetland loss, urban encroachment, and ridge fragmentation.
        </p>
      </div>

      {/* Main Slider Stage */}
      <SatelliteSlider />

      {/* Remote Sensing Methodology Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 text-xs font-mono uppercase text-slate-400 font-bold">
          <Database className="w-4 h-4 text-slate-600" />
          <span>Remote Sensing Methodology & Spectral Indices</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
          <div>
            <span className="font-bold text-slate-900 block mb-1">NDVI (Vegetation Density):</span>
            Normalized Difference Vegetation Index calculates the contrast between near-infrared (NIR) and red reflectance to quantify canopy photosynthetic vigour along the Sahyadri crest and Sinhagad slopes.
          </div>
          <div>
            <span className="font-bold text-slate-900 block mb-1">NDWI (Open Water Contrast):</span>
            Normalized Difference Water Index delineates lake shoreline boundaries at Pashan Lake and Mulshi Dam, isolating floating aquatic macrophytes from clear open water.
          </div>
          <div>
            <span className="font-bold text-slate-900 block mb-1">TIRS (Thermal Infrared Band):</span>
            Thermal Infrared Sensors from Landsat-8/9 quantify surface brightness temperature, mapping the thermal radiance footprint of urban concrete corridors in Hinjawadi and Baner.
          </div>
        </div>
      </div>
    </div>
  );
}
