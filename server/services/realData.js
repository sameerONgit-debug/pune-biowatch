import { URL } from 'url';

const OPEN_METEO_FORECAST = 'https://api.open-meteo.com/v1/forecast';
const OPEN_METEO_ARCHIVE = 'https://archive-api.open-meteo.com/v1/archive';
const GBIF_API = 'https://api.gbif.org/v1';
const PUNE = { latitude: 18.5204, longitude: 73.8567 };
// A transparent monitoring envelope around Pune; it is intentionally described as a bounding box,
// not as an official district boundary.
const PUNE_MONITORING_GEOMETRY = 'POLYGON((73.35 18.25,74.35 18.25,74.35 19.25,73.35 19.25,73.35 18.25))';
const CACHE = new Map();
const CACHE_TTL = {
  liveWeather: 10 * 60 * 1000,
  historicalClimate: 6 * 60 * 60 * 1000,
  speciesObservations: 24 * 60 * 60 * 1000,
};

export const DATA_SOURCES = {
  weather: 'Open-Meteo forecast and historical reanalysis',
  biodiversity: 'GBIF occurrence database',
  satellite: 'NASA Worldview / GIBS MODIS Terra imagery',
};

export const DATA_SOURCE_URLS = {
  weather: 'https://api.open-meteo.com/v1/forecast',
  climateArchive: 'https://archive-api.open-meteo.com/v1/archive',
  biodiversity: 'https://api.gbif.org/v1',
  satellite: 'https://wvs.earthdata.nasa.gov/api/v1/snapshot',
};

const SATELLITE_SCENES = [
  {
    id: 'pashan',
    title: 'Pashan Lake Wetland Basin',
    subtitle: 'Wetland edge, urban encirclement and open-water context',
    bbox: [73.74, 18.49, 73.85, 18.58],
    beforeDate: '2014-10-15',
    afterDate: '2024-10-15',
  },
  {
    id: 'sinhagad',
    title: 'Sinhagad Ridge & Montane Spur',
    subtitle: 'Western Ghats ridge and forest-cover context',
    bbox: [73.70, 18.31, 73.82, 18.42],
    beforeDate: '2014-11-15',
    afterDate: '2024-11-15',
  },
  {
    id: 'urban',
    title: 'Pune Northwest Tech Corridor',
    subtitle: 'Baner–Balewadi–Hinjawadi urban expansion context',
    bbox: [73.67, 18.52, 73.86, 18.67],
    beforeDate: '2010-03-15',
    afterDate: '2024-03-15',
  },
  {
    id: 'mulshi',
    title: 'Mulshi Catchment & Sahyadri Crest',
    subtitle: 'Reservoir edge and forest-buffer context',
    bbox: [73.43, 18.43, 73.63, 18.61],
    beforeDate: '2014-10-15',
    afterDate: '2024-10-15',
  },
];

function buildNasaSnapshotUrl(bbox, date) {
  const url = new URL('https://wvs.earthdata.nasa.gov/api/v1/snapshot');
  url.search = new URLSearchParams({
    REQUEST: 'GetSnapshot',
    LAYERS: 'MODIS_Terra_CorrectedReflectance_TrueColor',
    CRS: 'EPSG:4326',
    FORMAT: 'image/jpeg',
    WIDTH: '1200',
    HEIGHT: '750',
    // Worldview Snapshot API uses minLat,minLon,maxLat,maxLon (unlike the WMS convention).
    BBOX: [bbox[1], bbox[0], bbox[3], bbox[2]].join(','),
    TIME: date,
  });
  return url.toString();
}

export function getSatelliteScenes() {
  const mode = isLiveEnabled() ? 'live-source' : 'offline';
  return {
    mode,
    source: DATA_SOURCES.satellite,
    sourceUrl: DATA_SOURCE_URLS.satellite,
    retrievedAt: new Date().toISOString(),
    scenes: SATELLITE_SCENES.map((scene) => ({
      ...scene,
      beforeImage: isLiveEnabled() ? buildNasaSnapshotUrl(scene.bbox, scene.beforeDate) : null,
      afterImage: isLiveEnabled() ? buildNasaSnapshotUrl(scene.bbox, scene.afterDate) : null,
      provenance: 'NASA Worldview Snapshot API · MODIS Terra Corrected Reflectance True Color',
    })),
    note: isLiveEnabled()
      ? 'Images are public NASA scenes requested for the displayed dates and bounds. Context indicators below are curated and are not calculated from these scenes.'
      : 'Offline mode is enabled. Illustrative bundled fallback scenes are shown; they are not satellite observations.',
  };
}

function isLiveEnabled() {
  return process.env.BIOWATCH_DATA_MODE !== 'offline';
}

function getCached(key) {
  const entry = CACHE.get(key);
  if (!entry || entry.expiresAt < Date.now()) return null;
  return entry.value;
}

function setCached(key, value, ttl) {
  CACHE.set(key, { value, expiresAt: Date.now() + ttl });
  return value;
}

async function fetchJson(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'PuneBioWatch/1.0 (+https://github.com/sameerONgit-debug/pune-biowatch)' },
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

function average(values) {
  const valid = values.filter((value) => Number.isFinite(value));
  return valid.length ? valid.reduce((sum, value) => sum + value, 0) / valid.length : null;
}

function round(value, decimals = 2) {
  if (!Number.isFinite(value)) return null;
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function toRows(daily) {
  if (!daily?.time) return [];
  return daily.time.map((date, index) => ({
    date,
    year: Number(date.slice(0, 4)),
    month: Number(date.slice(5, 7)),
    temp: Number(daily.temperature_2m_mean?.[index]),
    maxTemp: Number(daily.temperature_2m_max?.[index]),
    rain: Number(daily.precipitation_sum?.[index]),
    humidity: Number(daily.relative_humidity_2m_mean?.[index]),
  }));
}

function groupByYear(rows) {
  return rows.reduce((groups, row) => {
    if (!groups[row.year]) groups[row.year] = [];
    groups[row.year].push(row);
    return groups;
  }, {});
}

function groupByMonth(rows) {
  return rows.reduce((groups, row) => {
    if (!groups[row.month]) groups[row.month] = [];
    groups[row.month].push(row);
    return groups;
  }, {});
}

function longestDrySpell(rows) {
  let current = 0;
  let longest = 0;
  rows.forEach((row) => {
    const isDry = row.rain >= 0 && row.rain < 1;
    current = isDry ? current + 1 : 0;
    longest = Math.max(longest, current);
  });
  return longest;
}

function countDrySpells(rows) {
  let count = 0;
  let current = 0;
  rows.forEach((row) => {
    const isDry = row.rain >= 0 && row.rain < 1;
    if (isDry) {
      current += 1;
    } else {
      if (current >= 5) count += 1;
      current = 0;
    }
  });
  if (current >= 5) count += 1;
  return count;
}

function monsoonRows(rows) {
  return rows.filter((row) => row.month >= 6 && row.month <= 9);
}

function buildAnnualTrend(recentRows, baselineMean, baselineRainfall) {
  const yearly = groupByYear(recentRows);
  return Object.entries(yearly).map(([year, rows]) => {
    const avgTemperature = average(rows.map((row) => row.temp));
    const annualRainfall = rows.reduce((sum, row) => sum + (Number.isFinite(row.rain) ? row.rain : 0), 0);
    const dryRows = monsoonRows(rows);
    const heatDays = rows.filter((row) => row.maxTemp >= 40).length;
    const drySpellDays = longestDrySpell(dryRows);
    const tempAnomaly = avgTemperature == null || baselineMean == null ? 0 : avgTemperature - baselineMean;
    const rainfallAnomaly = baselineRainfall ? ((annualRainfall - baselineRainfall) / baselineRainfall) * 100 : 0;
    const climatePressureProxy = clamp(Math.round(50 + tempAnomaly * 22 + heatDays * 0.7 + drySpellDays * 0.55), 0, 100);

    return {
      year: Number(year),
      avgTemperature: round(avgTemperature, 2),
      tempAnomaly: round(tempAnomaly, 2),
      annualRainfall: round(annualRainfall, 0),
      rainfallAnomaly: round(rainfallAnomaly, 1),
      extremeHeatDays: heatDays,
      monsoonDrySpells: drySpellDays,
      climatePressureProxy,
      // Kept for compatibility with existing clients; new UI should use climatePressureProxy.
      speciesStressIndex: climatePressureProxy,
    };
  });
}

function buildMonthlyClimatology(baselineRows, recentRows) {
  const baseline = groupByMonth(baselineRows);
  const recent = groupByMonth(recentRows);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return monthNames.map((month, index) => {
    const monthNumber = index + 1;
    const normalRows = baseline[monthNumber] || [];
    const currentRows = recent[monthNumber] || [];
    return {
      month,
      normalTemp: round(average(normalRows.map((row) => row.temp)), 1),
      currentTemp: round(average(currentRows.map((row) => row.temp)), 1),
      normalRain: round(average(normalRows.map((row) => row.rain)), 1),
      currentRain: round(average(currentRows.map((row) => row.rain)), 1),
      humidity: round(average(currentRows.map((row) => row.humidity)), 0),
    };
  });
}

function buildOnsetShift(baselineRows, recentRows) {
  const findOnset = (rows) => {
    const byYear = groupByYear(rows);
    const onsets = Object.values(byYear).map((yearRows) => {
      const monsoonWindow = yearRows.filter((row) => row.month >= 5 && row.month <= 7);
      for (let index = 0; index < monsoonWindow.length - 4; index += 1) {
        const window = monsoonWindow.slice(index, index + 5);
        if (window.reduce((sum, row) => sum + row.rain, 0) >= 40) {
          return new Date(window[0].date).getUTCDate() + (window[0].month - 6) * 30;
        }
      }
      return null;
    }).filter(Number.isFinite);
    return average(onsets);
  };

  const baselineOnset = findOnset(baselineRows);
  const recentOnset = findOnset(recentRows);
  if (baselineOnset == null || recentOnset == null) return 'Derived from daily rainfall';
  const shift = Math.round(recentOnset - baselineOnset);
  return `${shift >= 0 ? '+' : ''}${shift} days vs baseline`;
}

async function fetchArchive(startDate, endDate) {
  const url = new URL(OPEN_METEO_ARCHIVE);
  url.search = new URLSearchParams({
    latitude: String(PUNE.latitude),
    longitude: String(PUNE.longitude),
    start_date: startDate,
    end_date: endDate,
    daily: 'temperature_2m_mean,temperature_2m_max,precipitation_sum,relative_humidity_2m_mean',
    timezone: 'Asia/Kolkata',
  });
  return fetchJson(url.toString(), 9000);
}

export async function getLiveWeather() {
  const cached = getCached('live-weather');
  if (cached) return cached;
  if (!isLiveEnabled()) throw new Error('Live data disabled by BIOWATCH_DATA_MODE');

  const url = new URL(OPEN_METEO_FORECAST);
  url.search = new URLSearchParams({
    latitude: String(PUNE.latitude),
    longitude: String(PUNE.longitude),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m',
    daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code',
    forecast_days: '7',
    timezone: 'Asia/Kolkata',
  });
  const payload = await fetchJson(url.toString());
  return setCached('live-weather', {
    source: DATA_SOURCES.weather,
    sourceUrl: DATA_SOURCE_URLS.weather,
    retrievedAt: new Date().toISOString(),
    coordinates: PUNE,
    current: {
      time: payload.current?.time,
      temperature: payload.current?.temperature_2m,
      apparentTemperature: payload.current?.apparent_temperature,
      humidity: payload.current?.relative_humidity_2m,
      precipitation: payload.current?.precipitation,
      weatherCode: payload.current?.weather_code,
      windSpeed: payload.current?.wind_speed_10m,
    },
    daily: payload.daily,
  }, CACHE_TTL.liveWeather);
}

export async function getRegionalWeather(regions = []) {
  if (!isLiveEnabled() || !regions.length) throw new Error('Regional live data disabled');
  const url = new URL(OPEN_METEO_FORECAST);
  url.search = new URLSearchParams({
    latitude: regions.map((region) => region.coordinates.lat).join(','),
    longitude: regions.map((region) => region.coordinates.lng).join(','),
    current: 'temperature_2m,relative_humidity_2m,precipitation,weather_code',
    timezone: 'Asia/Kolkata',
  });
  const payload = await fetchJson(url.toString());
  const locations = Array.isArray(payload) ? payload : [payload];
  return regions.map((region, index) => {
    const current = locations[index]?.current || {};
    return {
      regionId: region.id,
      currentTemperature: current.temperature_2m ?? null,
      currentHumidity: current.relative_humidity_2m ?? null,
      currentPrecipitation: current.precipitation ?? null,
      currentWeatherCode: current.weather_code ?? null,
      observedAt: current.time ?? null,
    };
  });
}

export async function getHistoricalClimate(regions = []) {
  const cached = getCached('historical-climate');
  if (cached) return cached;
  if (!isLiveEnabled()) throw new Error('Historical live data disabled by BIOWATCH_DATA_MODE');

  const currentYear = new Date().getUTCFullYear();
  const lastCompleteYear = currentYear - 1;
  const recentStartYear = lastCompleteYear - 9;
  const [baselinePayload, recentPayload, liveWeather, regionalWeather] = await Promise.all([
    fetchArchive(`${recentStartYear - 30}-01-01`, `${recentStartYear - 1}-12-31`),
    fetchArchive(`${recentStartYear}-01-01`, `${lastCompleteYear}-12-31`),
    getLiveWeather().catch(() => null),
    getRegionalWeather(regions).catch(() => null),
  ]);

  const baselineRows = toRows(baselinePayload.daily);
  const recentRows = toRows(recentPayload.daily);
  const baselineYears = groupByYear(baselineRows);
  const baselineAnnualRain = Object.values(baselineYears).map((rows) => rows.reduce((sum, row) => sum + (Number.isFinite(row.rain) ? row.rain : 0), 0));
  const historicalAnnualMeanTemp = average(baselineRows.map((row) => row.temp));
  const historicalAnnualRainfall = average(baselineAnnualRain);
  const annualTrends = buildAnnualTrend(recentRows, historicalAnnualMeanTemp, historicalAnnualRainfall);
  const first = annualTrends[0]?.avgTemperature;
  const last = annualTrends[annualTrends.length - 1]?.avgTemperature;
  const decadeAvgTempRise = first == null || last == null ? null : `${last - first >= 0 ? '+' : ''}${round(last - first, 2)}°C`;
  const monsoonRowsRecent = monsoonRows(recentRows);
  const monsoonDrySpellAverageDays = round(average(Object.values(groupByYear(monsoonRowsRecent)).map(longestDrySpell)), 1);
  const monthlyClimatology = buildMonthlyClimatology(baselineRows, recentRows);

  return setCached('historical-climate', {
    annualTrends,
    monthlyClimatology,
    liveWeather,
    regionalWeather,
    districtOverview: {
      district: 'Pune District, Maharashtra',
      baselinePeriod: `${recentStartYear - 30}-${recentStartYear - 1} climate baseline`,
      historicalAnnualMeanTemp: round(historicalAnnualMeanTemp, 2),
      historicalAnnualRainfall: round(historicalAnnualRainfall, 0),
      decadeAvgTempRise,
      monsoonOnsetShiftDays: buildOnsetShift(baselineRows, recentRows),
      monsoonDrySpellAverageDays,
    },
    periodLabel: `${recentStartYear}–${lastCompleteYear}`,
    dataMeta: {
      mode: 'live',
      retrievedAt: new Date().toISOString(),
      sources: [DATA_SOURCES.weather],
      sourceUrls: [DATA_SOURCE_URLS.weather, DATA_SOURCE_URLS.climateArchive],
      note: 'Climate pressure proxy is calculated from observed temperature, rainfall, heat days and dry spells; it is not a measured species stress index.',
    },
  }, CACHE_TTL.historicalClimate);
}

async function getGbifOccurrence(scientificName) {
  const cacheKey = `gbif:${scientificName}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const matchUrl = `${GBIF_API}/species/match?name=${encodeURIComponent(scientificName)}`;
  const match = await fetchJson(matchUrl, 5000);
  if (!match.usageKey) throw new Error(`GBIF taxon not found for ${scientificName}`);

  const occurrenceUrl = new URL(`${GBIF_API}/occurrence/search`);
  occurrenceUrl.search = new URLSearchParams({
    taxon_key: String(match.usageKey),
    geometry: PUNE_MONITORING_GEOMETRY,
    limit: '0',
  });
  const occurrence = await fetchJson(occurrenceUrl.toString(), 7000);
  return setCached(cacheKey, {
    scientificName,
    gbifTaxonKey: match.usageKey,
    occurrenceCount: occurrence.count || 0,
    source: DATA_SOURCES.biodiversity,
    sourceUrl: DATA_SOURCE_URLS.biodiversity,
    retrievedAt: new Date().toISOString(),
  }, CACHE_TTL.speciesObservations);
}

async function mapWithConcurrency(items, worker, concurrency = 4) {
  const output = [];
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      try {
        output[index] = await worker(items[index]);
      } catch (error) {
        output[index] = { error: error.message };
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, run));
  return output;
}

export async function getSpeciesObservations(species = []) {
  if (!isLiveEnabled()) {
    return { mode: 'offline', source: DATA_SOURCES.biodiversity, sourceUrl: DATA_SOURCE_URLS.biodiversity, observations: [] };
  }
  const observations = await mapWithConcurrency(species, (item) => getGbifOccurrence(item.scientificName));
  return {
    mode: observations.some((item) => item.occurrenceCount != null) ? 'live' : 'fallback',
    source: DATA_SOURCES.biodiversity,
    sourceUrl: DATA_SOURCE_URLS.biodiversity,
    geometry: 'Pune monitoring bounding box (not an official district boundary)',
    retrievedAt: new Date().toISOString(),
    observations: observations.filter((item) => item.occurrenceCount != null),
  };
}
