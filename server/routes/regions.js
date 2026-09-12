import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data/regions.json');

const router = express.Router();

function getRegions() {
  const raw = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw);
}

// GET all regions
router.get('/', (req, res) => {
  try {
    const regions = getRegions();
    res.json({
      success: true,
      count: regions.length,
      data: regions,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch regions' });
  }
});

// GET region by id
router.get('/:id', (req, res) => {
  try {
    const regions = getRegions();
    const region = regions.find((r) => r.id === req.params.id);
    if (!region) {
      return res.status(404).json({ success: false, error: 'Region not found' });
    }
    res.json({ success: true, data: region });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch region' });
  }
});

export default router;
