# 🌿 Pune BioWatch — Regional Biodiversity & Climate Impact Platform

[![Node.js](https://img.shields.io/badge/Node.js-v24+-339933?logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?logo=leaflet)](https://leafletjs.com)
[![License](https://img.shields.io/badge/License-Academic%20Use-blue)](#)

A professional, data-driven web application and community engagement platform built for **Pune District, Maharashtra, India**. The platform monitors and models how rising temperatures, changing monsoon precipitation patterns, habitat fragmentation, and urban heat island effects impact local flora and fauna across key Pune ecological zones.

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

---

## 🛠 Tech Stack

- **Frontend:** React 18, Vite 6, Tailwind CSS
- **Icons:** Lucide React
- **Data Visualizations:** Recharts (composed charts, dual y-axes, area gradients, microclimate comparisons)
- **Maps:** Leaflet.js with CartoDB Voyager tiles centered on Pune (18.5204° N, 73.8567° E) with interactive vulnerability-coded markers
- **Backend:** Node.js + Express REST API reading and persisting JSON datasets
- **Satellite Remote Sensing:** Multi-temporal calibrated false-color and thermal satellite imagery (`/src/assets/satellite/`) with interactive before/after drag comparison slider.

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/regions` | Returns all 8 Pune sub-regions with coordinates, elevation, and climate summaries |
| `GET` | `/api/regions/:id` | Returns single region profile with local Marathi nomenclature |
| `GET` | `/api/species` | Returns 18+ species with filters (`?category=`, `?region=`, `?severity=`, `?search=`) |
| `GET` | `/api/species/:id` | Returns detailed species climate sensitivity matrix and recommended interventions |
| `GET` | `/api/climate` | Returns decadal climate anomalies (2015-2024), monthly normal baseline, and microclimate records |
| `GET` | `/api/alerts` | Returns active administrative directives with filters (`?severity=`, `?status=`, `?regionId=`) |
| `PATCH`| `/api/alerts/:id` | Updates alert operational status (`Pending` → `Reviewed` → `Action Taken`) |
| `GET` | `/api/sightings` | Returns citizen science biodiversity field observations |
| `POST`| `/api/sightings` | Submits and validates a citizen sighting report |
| `GET` | `/api/health` | Health check endpoint |

---

## 🗺 Core Application Sections

1. **Home / Landing Page:**
   - Hero banner emphasizing regional conservation mission
   - Live metrics summary banner (Species tracked, sub-regions monitored, active alerts, 10-yr temp rise)
   - Interactive spatial mini-map of Pune district with click-to-explore
   - High-priority urgent alerts ticker & featured indicator species

2. **Region Explorer:**
   - Full interactive Leaflet map of Pune district
   - Sub-region microclimate metrics (Summer temp, rainfall anomaly, humidity, elevation, area)
   - Satellite preview thumbnail
   - List of affected resident species and active directives for the selected zone

3. **Species Impact Database:**
   - Multi-faceted filter system (Taxa, Sub-Region, Climate Severity, IUCN Status, Search)
   - Toggle between interactive Cards view and dense tabular view
   - Deep-dive modal with climate sensitivity matrix (Temperature, Rainfall, Fragmentation, Urban Heat Island) and official conservation guidelines

4. **Climate Data Dashboard:**
   - Decadal mean temperature anomaly trend vs 1981-2010 baseline
   - Rainfall variability and extreme heat days (>40°C) correlation
   - Climate Stress Index vs species reproductive impairment
   - Sub-region microclimate comparison toggle

5. **Satellite Imagery Viewer:**
   - Split-screen before/after comparison slider for 4 Pune hotspots:
     - **Pashan Lake (2014 vs 2024):** 48.4% open water loss, siltation, and 58.7% water hyacinth mat cover
     - **Sinhagad Ridge (2014 vs 2024):** 18m road widening cut, parking sprawl, and slope desiccation
     - **Pune NW Tech Corridor (2010 vs 2024):** 54.3% concrete built-up gain and +8.6°C thermal surface anomaly
     - **Mulshi Catchment (2014 vs 2024):** Reservoir rim contraction, resort cuts, and landslide scars

6. **Administration Alert Desk:**
   - Internal forest department and municipal tool aesthetic
   - Tabular view of directives with trigger conditions and actionable recommendations
   - Interactive status dropdown (`Pending`, `Reviewed`, `Action Taken`) that updates the mock database via REST API
   - CSV export functionality for field teams

7. **About & Community Engagement:**
   - Project scope and academic/community engagement notice
   - Institutional citations (IMD Pune, Maharashtra Forest Department, IUCN)
   - "Report a Sighting" citizen science form with live client-side validation and submission to `/api/sightings`
   - Real-time community observation feed

---

## 📜 Academic Disclaimer

This project is created for academic research demonstration, urban environmental modeling, and public community engagement. Datasets and remote sensing composites represent synthesized regional trends derived from verified scientific literature and open meteorological archives.
