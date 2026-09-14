# 🌿 Pune BioWatch — Regional Biodiversity & Climate Impact Platform

[![Node.js](https://img.shields.io/badge/Node.js-v24+-339933?logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?logo=leaflet)](https://leafletjs.com)
[![License](https://img.shields.io/badge/License-Academic%20Use-blue)](#)

A professional, data-driven web application and community engagement platform built for **Pune District, Maharashtra, India**. The platform combines public live providers (Open-Meteo weather/archive, GBIF biodiversity occurrences, and NASA Worldview/GIBS imagery) with clearly labelled curated regional profiles and offline-safe bundled data.

---

## 📌 Scope & Geographic Coverage

Pune district features an extraordinary ecological gradient spanning from the biodiversity hotspot crests of the Western Ghats (Sahyadris) down to urban river floodplains and semi-arid Deccan plateau scrub:

1. **Sinhagad Hills & Ridge (1,312m)** — Endemic amphibians (*Raorchestes ghatei*), raptor ledges, and montane scrub desiccation.
2. **Pashan Lake & Wetland** — Central Asian Flyway waterfowl (*Anser indicus*, *Anas acuta*), Ramnadi siltation, and invasive water hyacinth mats.
3. **Mulshi Catchment & Sahyadri Rim** — High-rainfall subtropical moist evergreen forests, orographic rainfall volatility, and *Ratufa indica* habitat.
4. **Vetal & Taljai Tekdi Complex** — Remnant urban scrub hillocks, endemic succulents (*Caralluma adscendens*), and laterite plateau fire risks.
5. **Bhimashankar Wildlife Buffer Zone** — Moist semi-evergreen wildlife corridor, Malabar Giant Squirrel nesting, and canopy gaps.
6. **Panshet & Varasgaon Valleys** — High-gradient river catchment, rapid reservoir shoreline contraction, and reptile nesting disturbance.
7. **Mula-Mutha River Basin** — Urban riparian floodplain, extreme water temperatures, hypoxic wastewater surges, and native fish (*Tor khudree*) decline.
8. **Pune Urban Green Belts (SPPU & Empress Garden)** — Old-growth heritage canopy roosts of Indian Flying Fox (*Pteropus medius*) vulnerable to >42°C heatwaves.

---

## 🚀 Quick Start (Single Command)

Clone or navigate to the repository directory:

```bash
cd /Users/shreya/.gemini/antigravity/scratch/pune-biowatch
```

Install dependencies and start both the Express REST backend and Vite React frontend with a single command:

```bash
npm install
npm run dev
```

The application will launch with:
- **Frontend UI:** [http://localhost:3000](http://localhost:3000)
- **Backend REST API:** [http://localhost:5001](http://localhost:5001)

*(Vite automatically proxies all `/api/*` requests to the Express backend on port 5001).*

To force the documented offline path during development, run the backend with:

```bash
BIOWATCH_DATA_MODE=offline npm run dev:server
```

Without that flag, the backend attempts the public Open-Meteo, GBIF, and NASA scene integrations and returns source/mode metadata when it falls back.

---

## 🛠 Tech Stack

- **Frontend:** React 18, Vite 6, Tailwind CSS
- **Icons:** Lucide React
- **Data Visualizations:** Recharts (composed charts, dual y-axes, area gradients, microclimate comparisons)
- **Maps:** Leaflet.js with CartoDB Voyager tiles centered on Pune (18.5204° N, 73.8567° E) with interactive vulnerability-coded markers
- **Backend:** Node.js + Express REST API reading and persisting JSON datasets
- **Satellite Remote Sensing:** Keyless NASA Worldview Snapshot API requests for dated MODIS Terra Corrected Reflectance scenes, with explicitly labelled bundled illustrative fallbacks and an interactive before/after drag comparison slider.

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/regions` | Returns all 8 Pune sub-regions with coordinates, elevation, and climate summaries |
| `GET` | `/api/regions/:id` | Returns single region profile with local Marathi nomenclature |
| `GET` | `/api/species` | Returns 18+ species with filters (`?category=`, `?region=`, `?severity=`, `?search=`) |
| `GET` | `/api/species/:id` | Returns detailed curated species climate sensitivity profile and recommended interventions |
| `GET` | `/api/species/observations` | Returns GBIF occurrence counts for the tracked taxa inside the transparent Pune monitoring bounding box |
| `GET` | `/api/climate` | Returns Open-Meteo historical/current weather-derived climate series, provenance metadata, and bundled fallback data |
| `GET` | `/api/satellite` | Returns dated NASA Worldview/GIBS MODIS Terra scene URLs and provenance metadata |
| `GET` | `/api/alerts` | Returns active administrative directives with filters (`?severity=`, `?status=`, `?regionId=`) |
| `PATCH`| `/api/alerts/:id` | Updates alert operational status (`Pending` → `Reviewed` → `Action Taken`) |
| `GET` | `/api/sightings` | Returns citizen science biodiversity field observations |
| `POST`| `/api/sightings` | Submits and validates a citizen sighting report |
| `GET` | `/api/health` | Health check endpoint |

---

## 🗺 Core Application Sections

1. **Home / Landing Page:**
   - Hero banner emphasizing regional conservation mission
   - Source-labelled summary banner (tracked species, sub-regions, active curated directives, and live/fallback climate delta)
   - Interactive spatial mini-map of Pune district with click-to-explore
   - High-priority urgent alerts ticker & featured indicator species

2. **Region Explorer:**
   - Full interactive Leaflet map of Pune district
   - Curated sub-region climate profiles (summer temp, rainfall anomaly, humidity, elevation, area), with live weather surfaced in the climate dashboard
   - NASA scene preview thumbnail when the public imagery source is available
   - List of affected resident species and active directives for the selected zone

3. **Species Impact Database:**
   - Multi-faceted filter system (Taxa, Sub-Region, Climate Severity, IUCN Status, Search)
   - Toggle between interactive Cards view and dense tabular view
   - Deep-dive modal with climate sensitivity matrix (Temperature, Rainfall, Fragmentation, Urban Heat Island) and official conservation guidelines

4. **Climate Data Dashboard:**
   - Historical temperature, rainfall, humidity and extreme heat-day series from Open-Meteo archive data when available
   - Transparent climate-pressure proxy derived from weather observations; explicitly not a measured species-stress index
   - Current Pune weather reading and retrieval/source metadata
   - Curated sub-region profile comparison with live regional weather fields when available

5. **Satellite Imagery Viewer:**
   - Split-screen before/after comparison slider for 4 Pune hotspots using dated NASA Worldview/GIBS MODIS Terra scenes:
     - **Pashan Lake (2014 vs 2024):** wetland edge and open-water context
     - **Sinhagad Ridge (2014 vs 2024):** ridge, forest-cover and road-corridor context
     - **Pune NW Tech Corridor (2010 vs 2024):** urban-form and vegetation context
     - **Mulshi Catchment (2014 vs 2024):** reservoir edge and forest-buffer context
   - Curated interpretation notes are separated from the imagery; no static percentage is presented as a live satellite measurement

6. **Administration Alert Desk:**
   - Internal forest department and municipal tool aesthetic
   - Tabular view of directives with trigger conditions and actionable recommendations
   - Interactive status dropdown (`Pending`, `Reviewed`, `Action Taken`) that updates the bundled local alert store via REST API; directives remain curated unless a live alert integration is added
   - CSV export functionality for field teams

7. **About & Community Engagement:**
   - Project scope and academic/community engagement notice
   - Institutional citations (IMD Pune, Maharashtra Forest Department, IUCN)
   - "Report a Sighting" citizen science form with live client-side validation and submission to `/api/sightings`
   - Real-time community observation feed

---

## 📜 Academic Disclaimer

This project is created for academic research demonstration, urban environmental modeling, and public community engagement. Open-Meteo, GBIF, and NASA Worldview/GIBS requests are used without API keys where available. If a provider is unavailable, the app falls back to bundled datasets or explicitly labelled illustrative imagery. Curated species, regional, alert, and interpretation profiles must not be read as live sensor measurements or measured species responses.
