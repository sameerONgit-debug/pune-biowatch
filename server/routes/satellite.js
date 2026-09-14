import express from 'express';
import { getSatelliteScenes } from '../services/realData.js';

const router = express.Router();

// NASA GIBS publishes public, keyless imagery URLs. The browser loads the scenes on demand;
// the client retains an explicitly labelled illustrative fallback if a scene is unavailable.
router.get('/', (req, res) => {
  res.json({ success: true, data: getSatelliteScenes() });
});

export default router;
