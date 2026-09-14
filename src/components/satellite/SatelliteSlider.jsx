import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Calendar, Eye, Layers, MoveHorizontal, Satellite, ShieldAlert } from 'lucide-react';
import { api } from '../../services/api';

// These are deliberately retained as an offline-safe visual fallback. They are never described as
// satellite observations; the normal path is a dated NASA Worldview scene returned by the API.
import pashan2014 from '../../assets/satellite/pashan-2014.svg';
import pashan2024 from '../../assets/satellite/pashan-2024.svg';
import sinhagad2014 from '../../assets/satellite/sinhagad-2014.svg';
import sinhagad2024 from '../../assets/satellite/sinhagad-2024.svg';
import urban2010 from '../../assets/satellite/urban-2010.svg';
import urban2024 from '../../assets/satellite/urban-2024.svg';
import mulshi2014 from '../../assets/satellite/mulshi-2014.svg';
import mulshi2024 from '../../assets/satellite/mulshi-2024.svg';

const FALLBACK_HOTSPOTS = [
  {
    id: 'pashan',
    title: 'Pashan Lake Wetland Basin',
    subtitle: 'Wetland edge, urban encirclement and open-water context',
    beforeDate: '2014-10-15',
    afterDate: '2024-10-15',
    bbox: [73.74, 18.49, 73.85, 18.58],
    beforeImg: null,
    afterImg: null,
    fallbackBefore: pashan2014,
    fallbackAfter: pashan2024,
    context: 'Pashan Lake is a locally important urban wetland. Use the scene comparison to inspect shoreline, open-water and surrounding built-up context; this viewer does not calculate area change automatically.',
  },
  {
    id: 'sinhagad',
    title: 'Sinhagad Ridge & Montane Spur',
    subtitle: 'Western Ghats ridge and forest-cover context',
    beforeDate: '2014-11-15',
    afterDate: '2024-11-15',
    bbox: [73.70, 18.31, 73.82, 18.42],
    beforeImg: null,
    afterImg: null,
    fallbackBefore: sinhagad2014,
    fallbackAfter: sinhagad2024,
    context: 'Sinhagad sits within a moisture-sensitive Western Ghats landscape. Compare ridge texture, clearings and road corridors against the same public satellite product and date window.',
  },
  {
    id: 'urban',
    title: 'Pune Northwest Tech Corridor',
    subtitle: 'Baner–Balewadi–Hinjawadi urban expansion context',
    beforeDate: '2010-03-15',
    afterDate: '2024-03-15',
    bbox: [73.67, 18.52, 73.86, 18.67],
    beforeImg: null,
    afterImg: null,
    fallbackBefore: urban2010,
    fallbackAfter: urban2024,
    context: 'This scene pair frames the northwest growth corridor. Built-up expansion and vegetation patterns require image interpretation or a dedicated classification workflow; no static percentage is presented here as a live measurement.',
  },
  {
    id: 'mulshi',
    title: 'Mulshi Catchment & Sahyadri Crest',
    subtitle: 'Reservoir edge and forest-buffer context',
    beforeDate: '2014-10-15',
    afterDate: '2024-10-15',
    bbox: [73.43, 18.43, 73.63, 18.61],
    beforeImg: null,
    afterImg: null,
    fallbackBefore: mulshi2014,
    fallbackAfter: mulshi2024,
    context: 'Mulshi is a forested catchment at the Western Ghats crest. The public scenes provide visual context for reservoir edges and forest buffers, not an automated estimate of shoreline or canopy loss.',
  },
];

function formatSceneDate(value) {
  if (!value) return 'date unavailable';
  return new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`));
}

export default function SatelliteSlider() {
  const [hotspots, setHotspots] = useState(FALLBACK_HOTSPOTS);
  const [selectedId, setSelectedId] = useState(FALLBACK_HOTSPOTS[0].id);
  const [sourceMeta, setSourceMeta] = useState({ mode: 'loading', note: 'Requesting NASA scene metadata.' });
  const [failedImages, setFailedImages] = useState({});
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const selectedHotspot = hotspots.find((hotspot) => hotspot.id === selectedId) || hotspots[0];

  useEffect(() => {
    let cancelled = false;
    api.getSatelliteScenes().then((payload) => {
      if (cancelled) return;
      setSourceMeta(payload || { mode: 'offline', note: 'NASA scene metadata unavailable.' });
      if (!payload?.scenes?.length) return;
      const scenesById = new Map(payload.scenes.map((scene) => [scene.id, scene]));
      setHotspots((current) => current.map((hotspot) => ({
        ...hotspot,
        ...(scenesById.get(hotspot.id) || {}),
      })));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const percent = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (event) => {
      if (isDragging) handleMove(event.clientX);
    };
    const handleTouchMove = (event) => {
      if (isDragging && event.touches[0]) handleMove(event.touches[0].clientX);
    };

    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, handleMove]);

  const markImageFailed = (imageKey) => {
    setFailedImages((current) => ({ ...current, [imageKey]: true }));
  };

  const getSceneImage = (hotspot, side) => {
    const key = `${hotspot.id}-${side}`;
    const liveImage = side === 'before' ? hotspot.beforeImage : hotspot.afterImage;
    const fallbackImage = side === 'before' ? hotspot.fallbackBefore : hotspot.fallbackAfter;
    return failedImages[key] || !liveImage ? fallbackImage : liveImage;
  };

  const liveScene = Boolean(selectedHotspot?.beforeImage && selectedHotspot?.afterImage);
  const sourceLabel = sourceMeta.mode === 'live-source' && liveScene ? 'NASA SCENE' : sourceMeta.mode === 'loading' ? 'LOADING SOURCE' : 'OFFLINE FALLBACK';
  const beforeImage = getSceneImage(selectedHotspot, 'before');
  const afterImage = getSceneImage(selectedHotspot, 'after');
  const beforeFailed = failedImages[`${selectedHotspot.id}-before`];
  const afterFailed = failedImages[`${selectedHotspot.id}-after`];

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap gap-2">
        {hotspots.map((hotspot) => {
          const isSelected = hotspot.id === selectedHotspot.id;
          return (
            <button
              key={hotspot.id}
              onClick={() => {
                setSelectedId(hotspot.id);
                setSliderPos(50);
              }}
              className={`flex items-center space-x-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all ${
                isSelected
                  ? 'border-[#0e4d3b] bg-[#0e4d3b] text-white shadow-md scale-[1.02]'
                  : 'border-[#1c4032] bg-[#0b2119] text-[#9db5a8] hover:border-[#73e5cf]/45 hover:bg-[#102d22]'
              }`}
            >
              <Layers className={`h-3.5 w-3.5 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>{hotspot.title}</span>
            </button>
          );
        })}
      </div>

      <div className="surface overflow-hidden p-6 sm:p-7">
        <div className="flex flex-col gap-3 border-b border-[#1c4032] pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] ${
                liveScene && sourceMeta.mode === 'live-source' && !beforeFailed && !afterFailed
                  ? 'border-[#73e5cf]/40 bg-[#102d22] text-[#9ee7b8]'
                  : 'border-amber-400/40 bg-amber-400/10 text-amber-200'
              }`}>
                {sourceLabel}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#78988a]">MODIS Terra · true color</span>
            </div>
            <h2 className="mt-1 text-xl font-extrabold text-slate-100">{selectedHotspot.title}</h2>
            <p className="text-xs font-medium text-[#8eaa9d]">{selectedHotspot.subtitle}</p>
          </div>

          <div className="flex items-center space-x-2 self-start rounded-lg border border-[#1c4032] bg-[#091a15] px-3 py-1.5 font-mono text-xs text-[#83a396] md:self-auto">
            <MoveHorizontal className="h-4 w-4 animate-pulse text-emerald-400" />
            <span>Drag center divider to compare</span>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative mt-5 aspect-[16/10] max-h-[500px] w-full cursor-ew-resize select-none overflow-hidden rounded-xl border border-[#285442] bg-slate-950 shadow-[0_20px_60px_rgba(0,0,0,0.28)] sm:aspect-[16/9]"
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          <img
            src={afterImage}
            alt={`${selectedHotspot.title} scene from ${formatSceneDate(selectedHotspot.afterDate)}`}
            onError={() => markImageFailed(`${selectedHotspot.id}-after`)}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
            <img
              src={beforeImage}
              alt={`${selectedHotspot.title} scene from ${formatSceneDate(selectedHotspot.beforeDate)}`}
              onError={() => markImageFailed(`${selectedHotspot.id}-before`)}
              className="pointer-events-none absolute left-0 top-0 h-full max-w-none"
              style={{ width: containerRef.current ? containerRef.current.clientWidth : '100%' }}
            />
          </div>

          <div className="pointer-events-none absolute bottom-4 left-4 z-20">
            <span className="flex items-center space-x-1.5 rounded-lg border border-emerald-400/40 bg-slate-950/85 px-3 py-1.5 font-mono text-xs font-bold text-emerald-300 shadow-lg backdrop-blur-md">
              <Calendar className="h-3.5 w-3.5" />
              <span>BEFORE · {formatSceneDate(selectedHotspot.beforeDate)}</span>
            </span>
          </div>
          <div className="pointer-events-none absolute bottom-4 right-4 z-20">
            <span className="flex items-center space-x-1.5 rounded-lg border border-rose-400/40 bg-slate-950/85 px-3 py-1.5 font-mono text-xs font-bold text-rose-300 shadow-lg backdrop-blur-md">
              <Calendar className="h-3.5 w-3.5" />
              <span>AFTER · {formatSceneDate(selectedHotspot.afterDate)}</span>
            </span>
          </div>

          <div className="pointer-events-none absolute bottom-0 top-0 z-30 w-1 bg-white shadow-2xl" style={{ left: `${sliderPos}%` }}>
            <div className="pointer-events-auto absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-white bg-slate-900/90 text-white shadow-2xl transition-transform hover:scale-110">
              <MoveHorizontal className="h-5 w-5 text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Provider', value: 'NASA GIBS' },
            { label: 'Product', value: 'MODIS Terra' },
            { label: 'Before scene', value: formatSceneDate(selectedHotspot.beforeDate) },
            { label: 'After scene', value: formatSceneDate(selectedHotspot.afterDate) },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-[#1c4032] bg-[#091a15] p-3">
              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[#78988a]">{item.label}</div>
              <div className="mt-1 text-sm font-bold text-[#d9f99d]">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-[#1c4032] bg-[#091a15] p-4 text-xs leading-relaxed text-[#9db5a8]">
          <div className="mb-1 flex items-center gap-2 font-bold text-[#d9f99d]">
            <Eye className="h-3.5 w-3.5" />
            Interpretation context · not an automated measurement
          </div>
          {selectedHotspot.context}
        </div>

        <div className="mt-4 flex flex-col gap-2 border-t border-[#1c4032] pt-4 text-[10px] leading-relaxed text-[#78988a] sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-2">
            {liveScene && !beforeFailed && !afterFailed ? <Satellite className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#73e5cf]" /> : <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300" />}
            <span>{liveScene && !beforeFailed && !afterFailed ? selectedHotspot.provenance || 'NASA Worldview Snapshot API · MODIS Terra Corrected Reflectance True Color' : sourceMeta.note || 'NASA imagery is unavailable; bundled illustrative scenes are shown instead.'}</span>
          </div>
          <div className="flex shrink-0 items-center gap-3 font-mono uppercase tracking-[0.1em]">
            <span>Bounds (lon,lat): {selectedHotspot.bbox?.join(', ')}</span>
            {sourceMeta.sourceUrl && <a href={sourceMeta.sourceUrl} target="_blank" rel="noreferrer" className="text-[#73e5cf] hover:text-[#d9f99d]">source ↗</a>}
          </div>
        </div>
      </div>
    </div>
  );
}
