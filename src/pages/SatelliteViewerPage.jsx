import React from 'react';
import SatelliteSlider from '../components/satellite/SatelliteSlider';
import { Database, Layers } from 'lucide-react';

export default function SatelliteViewerPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="surface p-6 sm:p-8">
        <div className="eyebrow"><Layers className="h-3.5 w-3.5" /> Multispectral land-cover analysis</div>
        <h1 className="page-title">
          Decadal Satellite Earth Observation Viewer
        </h1>
        <p className="page-subtitle max-w-3xl">
          Visualizing 10-year ecological transformations across critical Pune hotspots using calibrated Sentinel-2 and Landsat multispectral composites. Drag the interactive slider to examine wetland loss, urban encroachment, and ridge fragmentation.
        </p>
      </div>

      {/* Main Slider Stage */}
      <SatelliteSlider />

      {/* Remote Sensing Methodology Card */}
      <div className="surface space-y-5 p-6 sm:p-7">
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
