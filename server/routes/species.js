import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getSpeciesObservations } from '../services/realData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data/species.json');

const router = express.Router();

function getSpecies() {
  const raw = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw);
}

// GET all species with optional query filters (category, region, severity, search)
router.get('/', (req, res) => {
  try {
    let speciesList = getSpecies();
    const { category, region, severity, search } = req.query;

    if (category && category !== 'All') {
      speciesList = speciesList.filter(
        (s) => s.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (region && region !== 'All') {
      speciesList = speciesList.filter((s) => s.regions.includes(region));
    }

    if (severity && severity !== 'All') {
      speciesList = speciesList.filter(
        (s) => s.climateSeverity.toLowerCase() === severity.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      speciesList = speciesList.filter(
        (s) =>
          s.commonName.toLowerCase().includes(q) ||
          s.scientificName.toLowerCase().includes(q) ||
          (s.marathiName && s.marathiName.toLowerCase().includes(q)) ||
          s.description.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      count: speciesList.length,
      data: speciesList,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch species' });
  }
});

// GET real GBIF occurrence counts for the tracked species. This is intentionally separate so the initial UI can render immediately.
router.get('/observations', async (req, res) => {
  try {
    const observations = await getSpeciesObservations(getSpecies());
    res.json({ success: true, data: observations.observations, meta: observations });
  } catch (error) {
    res.status(502).json({ success: false, error: 'Failed to fetch GBIF observations', details: error.message });
  }
});

// GET species by id
router.get('/:id', (req, res) => {
  try {
    const speciesList = getSpecies();
    const species = speciesList.find((s) => s.id === req.params.id);
    if (!species) {
      return res.status(404).json({ success: false, error: 'Species not found' });
    }
    res.json({ success: true, data: species });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch species details' });
  }
});

export default router;
