import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data/climate.json');

const router = express.Router();

function getClimateData() {
  const raw = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw);
}

// GET all climate data (overview, annual trends, monthly climatology, regional comparisons)
router.get('/', (req, res) => {
  try {
    const climate = getClimateData();
    res.json({ success: true, data: climate });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch climate data' });
  }
});

// GET regional climate comparison
router.get('/regions/:regionId?', (req, res) => {
  try {
    const climate = getClimateData();
    const { regionId } = req.params;
    if (regionId) {
      const match = climate.regionalComparisons.find((r) => r.regionId === regionId);
      if (!match) {
        return res.status(404).json({ success: false, error: 'Region climate not found' });
      }
      return res.json({ success: true, data: match });
    }
    res.json({ success: true, data: climate.regionalComparisons });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch regional comparisons' });
  }
});

export default router;
