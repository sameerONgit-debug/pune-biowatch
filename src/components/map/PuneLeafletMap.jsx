import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

export default function PuneLeafletMap({
  regions = [],
  selectedRegionId = null,
  onSelectRegion = () => {},
  height = '520px',
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Pune Center Coordinates
    const PUNE_CENTER = [18.5204, 73.8567];

    const map = L.map(mapContainerRef.current, {
      center: PUNE_CENTER,
      zoom: 10,
      zoomControl: true,
      scrollWheelZoom: false,
    });

    // High quality OpenStreetMap / CartoDB Voyager tiles (clean, light, scientific)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers & Polygons when regions change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !regions.length) return;

    // Clear old markers
    Object.values(markersRef.current).forEach((layer) => {
      map.removeLayer(layer);
    });
    markersRef.current = {};

    regions.forEach((region) => {
      const { lat, lng } = region.coordinates;
      const isSelected = region.id === selectedRegionId;

      // Color based on vulnerability
      let colorHex = '#10b981'; // green
      let ringColor = 'rgba(16, 185, 129, 0.4)';
      if (region.metrics.vulnerabilityScore >= 85) {
        colorHex = '#ef4444'; // red
        ringColor = 'rgba(239, 68, 68, 0.4)';
      } else if (region.metrics.vulnerabilityScore >= 75) {
        colorHex = '#f59e0b'; // amber
        ringColor = 'rgba(245, 158, 11, 0.4)';
      }

      // Create Custom HTML Icon
      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            position: relative;
            width: ${isSelected ? '38px' : '30px'};
            height: ${isSelected ? '38px' : '30px'};
            background: ${colorHex};
            border: 3px solid #ffffff;
            border-radius: 50%;
            box-shadow: 0 4px 12px ${ringColor}, 0 2px 4px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-size: ${isSelected ? '13px' : '11px'};
            font-weight: 800;
            font-family: monospace;
            cursor: pointer;
            transition: all 0.2s ease;
            transform: translate(-50%, -50%);
          ">
            ${region.metrics.vulnerabilityScore}
          </div>
        `,
        iconSize: [0, 0],
      });

      // Buffer circle on the map showing sub-region extent
      const circle = L.circle([lat, lng], {
        radius: (region.areaKm2 || 10) * 120,
        color: colorHex,
        fillColor: colorHex,
        fillOpacity: isSelected ? 0.25 : 0.12,
        weight: isSelected ? 2.5 : 1.2,
      }).addTo(map);

      // Marker
      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

      // Popup Content
      const popupHtml = `
        <div style="font-family: inherit; width: 230px; padding: 12px;">
          <div style="font-size: 10px; font-weight: 700; color: ${colorHex}; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;">
            Curated profile: ${region.metrics.vulnerabilityScore}/100
          </div>
          <div style="font-size: 14px; font-weight: 800; color: #eaf8ed; line-height: 1.2; margin-bottom: 4px;">
            ${region.name}
          </div>
          <div style="font-size: 11px; color: #9db5a8; margin-bottom: 8px;">
            ${region.habitatType}
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 11px; color: #83a396; background: #091a15; padding: 6px 8px; border-radius: 6px; margin-bottom: 10px;">
            <span>Species: <b>${region.metrics.speciesCount}</b></span>
            <span>Alerts: <b style="color: #e11d48;">${region.metrics.activeAlertCount}</b></span>
            <span>Temp: <b style="color: #d97706;">${region.metrics.temperatureRise10Yr}</b></span>
          </div>
          <button id="popup-btn-${region.id}" style="
            width: 100%;
            background: #d9f99d;
            color: #06110f;
            font-size: 11px;
            font-weight: 600;
            padding: 6px 10px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
          ">
            Inspect Sub-Region Dossier →
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml);

      // Attach click handlers
      marker.on('click', () => {
        onSelectRegion(region);
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`popup-btn-${region.id}`);
        if (btn) {
          btn.onclick = () => {
            onSelectRegion(region);
          };
        }
      });

      circle.on('click', () => {
        onSelectRegion(region);
        marker.openPopup();
      });

      // Group marker & circle together
      markersRef.current[region.id] = L.layerGroup([circle, marker]).addTo(map);
    });
  }, [regions, selectedRegionId]);

  // Pan to selected region if updated externally
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedRegionId) return;

    const targetRegion = regions.find((r) => r.id === selectedRegionId);
    if (targetRegion) {
      map.flyTo([targetRegion.coordinates.lat, targetRegion.coordinates.lng], 12, {
        duration: 1.2,
      });
    }
  }, [selectedRegionId, regions]);

  return (
    <div className="relative rounded-xl overflow-hidden border border-slate-300 shadow-inner bg-slate-100">
      <div ref={mapContainerRef} style={{ height, width: '100%' }} />

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-20 rounded-xl border border-[#1b3a2e] bg-[#0b1c17]/95 p-3 text-xs font-mono shadow-xl backdrop-blur-md">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#d9f99d]">
          Climate Vulnerability Index
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-500 border border-white shadow-sm"></span>
            <span className="text-[#b4cdbd]">Critical (&gt;85)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 border border-white shadow-sm"></span>
            <span className="text-[#b4cdbd]">High Stress (70-84)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white shadow-sm"></span>
            <span className="text-[#b4cdbd]">Moderate (&lt;70)</span>
          </div>
        </div>
        <div className="mt-2 border-t border-[#1b3a2e] pt-1.5 text-[10px] text-[#78988a]">
          Click marker to open dossier
        </div>
      </div>
    </div>
  );
}
