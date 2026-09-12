import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data/sightings.json');

const router = express.Router();

function getSightings() {
  const raw = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw);
}

function saveSightings(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
}

// GET sightings
router.get('/', (req, res) => {
  try {
    const sightings = getSightings();
    res.json({ success: true, count: sightings.length, data: sightings });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch sightings' });
  }
});

// POST report a new sighting
router.post('/', (req, res) => {
  try {
    const sightings = getSightings();
    const {
      observerName,
      observerEmail,
      regionId,
      regionName,
      speciesId,
      speciesName,
      date,
      locationDescription,
      observedBehavior,
      stressLevel,
      count,
    } = req.body;

    // Validation
    if (!observerName || !observerEmail || !regionId || !date || !observedBehavior) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: observerName, observerEmail, regionId, date, observedBehavior',
      });
    }

    const newSighting = {
      id: `SGT-${1000 + sightings.length + 1}`,
      observerName: observerName.trim(),
      observerEmail: observerEmail.trim(),
      regionId,
      regionName: regionName || regionId,
      speciesId: speciesId || 'unidentified-species',
      speciesName: speciesName || 'Unidentified Sighting',
      date,
      locationDescription: locationDescription ? locationDescription.trim() : 'Location not specified',
      observedBehavior: observedBehavior.trim(),
      stressLevel: stressLevel || 'Moderate',
      count: Number(count) || 1,
      status: 'Community Submitted',
      submittedAt: new Date().toISOString(),
    };

    sightings.unshift(newSighting);
    saveSightings(sightings);

    res.status(201).json({
      success: true,
      message: 'Biodiversity sighting recorded successfully for scientific verification',
      data: newSighting,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to submit sighting' });
  }
});

export default router;
