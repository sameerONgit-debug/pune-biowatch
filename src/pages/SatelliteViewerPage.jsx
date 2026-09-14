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
          Compare dated, keyless NASA Worldview MODIS Terra scenes across critical Pune hotspots. Drag the interactive slider to inspect wetland edges, urban form and ridge context; interpretation notes remain separate from automated change measurements.
        </p>
      </div>

      {/* Main Slider Stage */}
      <SatelliteSlider />

      {/* Remote Sensing Methodology Card */}
      <div className="surface space-y-5 p-6 sm:p-7">
        <div className="flex items-center space-x-2 text-xs font-mono uppercase text-slate-400 font-bold">
          <Database className="w-4 h-4 text-slate-600" />
          <span>Scene provenance & interpretation limits</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
          <div>
            <span className="font-bold text-slate-900 block mb-1">Public scene product:</span>
            The viewer requests NASA Worldview Snapshot API imagery from the public GIBS archive using MODIS Terra Corrected Reflectance True Color, a keyless, dated scene product.
          </div>
          <div>
            <span className="font-bold text-slate-900 block mb-1">Repeatable comparison:</span>
            Each hotspot uses a fixed geographic bounding box and paired date parameters. The slider is a visual comparison tool; it does not align or classify pixels.
          </div>
          <div>
            <span className="font-bold text-slate-900 block mb-1">What is not claimed:</span>
            NDVI, NDWI, thermal anomalies and percentage change require a dedicated calibrated analysis. The context notes below the viewer are not measurements derived live from the displayed scenes.
          </div>
        </div>
      </div>
    </div>
  );
}
