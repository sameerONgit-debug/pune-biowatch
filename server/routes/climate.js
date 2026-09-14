import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getHistoricalClimate } from '../services/realData.js';
import regions from '../data/regions.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data/climate.json');

const router = express.Router();

function getFallbackClimateData() {
  const raw = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw);
}

function withFallbackMeta(data, error) {
  return {
    ...data,
    dataMeta: {
      mode: 'fallback',
      retrievedAt: new Date().toISOString(),
      sources: ['Bundled regional baseline'],
      sourceUrls: [],
      note: error ? `Live sources unavailable: ${error.message}` : 'Using bundled regional baseline.',
    },
  };
}

// GET climate data. Live Open-Meteo data is preferred; the bundled baseline keeps the demo usable offline.
router.get('/', async (req, res) => {
  const fallback = getFallbackClimateData();
  try {
    if (process.env.BIOWATCH_DATA_MODE === 'offline') {
      return res.json({ success: true, data: withFallbackMeta(fallback) });
    }

    const live = await getHistoricalClimate(regions);
    const regionalComparisons = fallback.regionalComparisons.map((profile) => ({
      ...profile,
      ...(live.regionalWeather?.find((item) => item.regionId === profile.regionId) || {}),
    }));

    res.json({
      success: true,
      data: {
        ...fallback,
        ...live,
        regionalComparisons,
      },
    });
  } catch (error) {
    console.warn('[Pune BioWatch] Live climate sources unavailable:', error.message);
    res.json({ success: true, data: withFallbackMeta(fallback, error) });
  }
});

// GET regional climate comparison
router.get('/regions/:regionId?', (req, res) => {
  try {
    const climate = getFallbackClimateData();
    const { regionId } = req.params;
    if (regionId) {
      const match = climate.regionalComparisons.find((r) => r.regionId === regionId);
      if (!match) return res.status(404).json({ success: false, error: 'Region climate not found' });
      return res.json({ success: true, data: match });
    }
    res.json({ success: true, data: climate.regionalComparisons });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch regional comparisons' });
  }
});

export default router;
