import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Layers, MoveHorizontal, AlertCircle, TrendingDown, Eye, Calendar } from 'lucide-react';

import pashan2014 from '../../assets/satellite/pashan-2014.svg';
import pashan2024 from '../../assets/satellite/pashan-2024.svg';
import sinhagad2014 from '../../assets/satellite/sinhagad-2014.svg';
import sinhagad2024 from '../../assets/satellite/sinhagad-2024.svg';
import urban2010 from '../../assets/satellite/urban-2010.svg';
import urban2024 from '../../assets/satellite/urban-2024.svg';
import mulshi2014 from '../../assets/satellite/mulshi-2014.svg';
import mulshi2024 from '../../assets/satellite/mulshi-2024.svg';

const HOTSPOTS = [
  {
    id: 'pashan',
    title: 'Pashan Lake Wetland Basin',
    subtitle: 'Siltation, Urban Encirclement & Invasive Hyacinth Spread',
    beforeYear: 'OCT 2014',
    afterYear: 'OCT 2024',
    beforeImg: pashan2014,
    afterImg: pashan2024,
    metrics: [
      { label: 'Open Water Area', value: '-48.4%', trend: 'down', color: 'text-red-600' },
      { label: 'Water Hyacinth Bloom', value: '58.7%', trend: 'up', color: 'text-amber-600' },
      { label: 'Buffer Tree Canopy', value: '-14.1%', trend: 'down', color: 'text-red-600' },
      { label: 'Wintering Waterfowl Count', value: '-62%', trend: 'down', color: 'text-rose-600' },
    ],
    summary:
      'Over the 10-year satellite baseline, Pashan Lake has lost nearly half its contiguous open water surface. Runoff from rapid upstream residential development in Baner-Sus along Ramnadi deposited thousands of tonnes of construction silt, while nutrient-rich wastewater catalyzed an explosive infestation of invasive Water Hyacinth (Eichhornia crassipes), suffocating migratory bird mudflats.',
  },
  {
    id: 'sinhagad',
    title: 'Sinhagad Ridge & Montane Spur',
    subtitle: 'Canopy Thinning, Ghat Road Widening & Micro-Refugium Desiccation',
    beforeYear: 'NOV 2014',
    afterYear: 'NOV 2024',
    beforeImg: sinhagad2014,
    afterImg: sinhagad2024,
    metrics: [
      { label: 'Forest Density (NDVI)', value: '-23.7%', trend: 'down', color: 'text-amber-600' },
      { label: 'Road Cleared Width', value: '300%', trend: 'up', color: 'text-red-600' },
      { label: 'Surface Soil Temp', value: '+3.4°C', trend: 'up', color: 'text-red-600' },
      { label: 'Spring Seepage Duration', value: '-4 wks', trend: 'down', color: 'text-rose-600' },
    ],
    summary:
      'The Sahyadri ridge spur at Sinhagad provides moisture-dependent habitats for rare endemic amphibians and reptiles. Satellite multispectral reflectance documents an 18-meter-wide road widening clearing scar, expanded summit concrete stalls, and severe slope desiccation on southwest-facing ravines where Ghate’s bush frog nests.',
  },
  {
    id: 'urban',
    title: 'Pune Northwest Tech Corridor',
    subtitle: 'Impervious Surface Expansion & Urban Heat Island Footprint',
    beforeYear: 'MAR 2010',
    afterYear: 'MAR 2024',
    beforeImg: urban2010,
    afterImg: urban2024,
    metrics: [
      { label: 'Impervious Built-Up', value: '+54.3%', trend: 'up', color: 'text-red-600' },
      { label: 'Thermal Surface Anomaly', value: '+8.6°C', trend: 'up', color: 'text-red-600' },
      { label: 'Tree Canopy Cover', value: '-16.2%', trend: 'down', color: 'text-amber-600' },
      { label: 'Nocturnal Heat Retention', value: '+4.2°C', trend: 'up', color: 'text-rose-600' },
    ],
    summary:
      'Between 2010 and 2024, the Baner-Balewadi-Hinjawadi corridor transitioned from rural agricultural holdings and scrub buffers into continuous asphalt and high-rise concrete. Thermal infrared satellite imagery reveals an intense Urban Heat Island (UHI) dome with ground temperatures reaching 42.8°C, threatening urban fruit bat roosts at SPPU and Empress Garden.',
  },
  {
    id: 'mulshi',
    title: 'Mulshi Catchment & Sahyadri Crest',
    subtitle: 'Orographic Forest Buffer Fragmentation & Reservoir Contraction',
    beforeYear: 'OCT 2014',
    afterYear: 'OCT 2024',
    beforeImg: mulshi2014,
    afterImg: mulshi2024,
    metrics: [
      { label: 'Water Surface Area', value: '-16.7%', trend: 'down', color: 'text-amber-600' },
      { label: 'Eroded Shoreline Rim', value: '+31.4%', trend: 'up', color: 'text-red-600' },
      { label: 'Riparian Forest Buffer', value: '-6.8%', trend: 'down', color: 'text-amber-600' },
      { label: 'Slope Landslide Scars', value: '+12 sites', trend: 'up', color: 'text-rose-600' },
    ],
    summary:
      'Nestled against the heavy-rainfall crest of the Western Ghats, Mulshi supplies essential hydroelectric and riparian buffer ecosystem services. Multi-year comparison shows severe shoreline drawdown lines exposed to dry winds, lakeside resort excavation cuts, and flash rainfall landslide strips across steep slopes.',
  },
];

export default function SatelliteSlider() {
  const [selectedHotspot, setSelectedHotspot] = useState(HOTSPOTS[0]);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback(
    (clientX) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const width = rect.width;
      let percent = (x / width) * 100;
      if (percent < 2) percent = 2;
      if (percent > 98) percent = 98;
      setSliderPos(percent);
    },
    []
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e) => {
      if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX);
    };

    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, handleMove]);

  return (
    <div className="space-y-7">
      {/* Hotspot Selector Pills */}
      <div className="flex flex-wrap gap-2">
        {HOTSPOTS.map((hotspot) => {
          const isSelected = hotspot.id === selectedHotspot.id;
          return (
            <button
              key={hotspot.id}
              onClick={() => {
                setSelectedHotspot(hotspot);
                setSliderPos(50);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all border ${
                isSelected
                  ? 'bg-[#0e4d3b] text-white border-[#0e4d3b] shadow-md scale-[1.02]'
                  : 'bg-[#0b2119] text-[#9db5a8] border-[#1c4032] hover:border-[#73e5cf]/45 hover:bg-[#102d22]'
              }`}
            >
              <Layers className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>{hotspot.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Comparison Stage */}
      <div className="surface overflow-hidden p-6 sm:p-7">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="rounded border border-[#285442] bg-[#102d22] px-2 py-0.5 font-mono text-xs font-bold uppercase text-[#9ee7b8]">
                Sentinel-2 & Landsat Decadal Observation
              </span>
              <span className="font-mono text-xs text-[#78988a]">10-Year Satellite Revisit</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">
              {selectedHotspot.title}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {selectedHotspot.subtitle}
            </p>
          </div>

          <div className="flex items-center space-x-2 self-start rounded-lg border border-[#1c4032] bg-[#091a15] px-3 py-1.5 font-mono text-xs text-[#83a396] md:self-auto">
            <MoveHorizontal className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>Drag center divider to compare</span>
          </div>
        </div>

        {/* Interactive Drag Stage */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[500px] rounded-xl overflow-hidden select-none border border-slate-300 shadow-md cursor-ew-resize bg-slate-950"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Base Layer: AFTER Image (Right side revealed as slider moves left) */}
          <img
            src={selectedHotspot.afterImg}
            alt={`${selectedHotspot.title} ${selectedHotspot.afterYear}`}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          {/* Top Layer: BEFORE Image (Clipped by slider position) */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPos}%` }}
          >
            <img
              src={selectedHotspot.beforeImg}
              alt={`${selectedHotspot.title} ${selectedHotspot.beforeYear}`}
              className="absolute top-0 left-0 h-full max-w-none pointer-events-none"
              style={{
                width: containerRef.current ? containerRef.current.clientWidth : '100%',
              }}
            />
          </div>

          {/* Divider Line & Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-30 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-900/90 text-white border-2 border-white shadow-2xl flex items-center justify-center pointer-events-auto cursor-ew-resize hover:scale-110 transition-transform">
              <MoveHorizontal className="w-5 h-5 text-emerald-400" />
            </div>
          </div>

          {/* Floating Timestamp Badges */}
          <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
            <span className="bg-slate-950/85 backdrop-blur-md text-emerald-400 text-xs font-mono font-bold px-3 py-1.5 rounded-lg border border-emerald-500/50 shadow-lg flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>BEFORE: {selectedHotspot.beforeYear}</span>
            </span>
          </div>

          <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
            <span className="bg-slate-950/85 backdrop-blur-md text-rose-400 text-xs font-mono font-bold px-3 py-1.5 rounded-lg border border-rose-500/50 shadow-lg flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>AFTER: {selectedHotspot.afterYear}</span>
            </span>
          </div>
        </div>

        {/* Change Metrics Cards */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
            Decadal Remote Sensing Key Change Metrics
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {selectedHotspot.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="metric-card flex flex-col justify-between"
              >
                <span className="text-[11px] text-slate-500 font-medium">{metric.label}</span>
                <span className={`text-xl font-extrabold font-mono mt-1 ${metric.color}`}>
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative Description */}
        <div className="surface-subtle p-4 text-xs leading-relaxed text-slate-700">
          <span className="font-bold text-slate-900 block mb-1">
            Remote Sensing & Environmental Impact Analysis:
          </span>
          {selectedHotspot.summary}
        </div>
      </div>
    </div>
  );
}
