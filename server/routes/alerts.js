import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data/alerts.json');

const router = express.Router();

function getAlerts() {
  const raw = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw);
}

function saveAlerts(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
}

// GET all alerts with optional filtering by severity, status, region
router.get('/', (req, res) => {
  try {
    let alerts = getAlerts();
    const { severity, status, regionId } = req.query;

    if (severity && severity !== 'All') {
      alerts = alerts.filter((a) => a.severity.toLowerCase() === severity.toLowerCase());
    }

    if (status && status !== 'All') {
      alerts = alerts.filter((a) => a.status.toLowerCase() === status.toLowerCase());
    }

    if (regionId && regionId !== 'All') {
      alerts = alerts.filter((a) => a.regionId === regionId);
    }

    res.json({
      success: true,
      count: alerts.length,
      data: alerts,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch alerts' });
  }
});

// GET single alert
router.get('/:id', (req, res) => {
  try {
    const alerts = getAlerts();
    const alert = alerts.find((a) => a.id === req.params.id);
    if (!alert) {
      return res.status(404).json({ success: false, error: 'Alert not found' });
    }
    res.json({ success: true, data: alert });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch alert' });
  }
});

// PATCH update alert status / admin notes
router.patch('/:id', (req, res) => {
  try {
    const alerts = getAlerts();
    const index = alerts.findIndex((a) => a.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Alert not found' });
    }

    const { status, adminNotes } = req.body;
    if (status) {
      alerts[index].status = status;
      alerts[index].statusUpdatedAt = new Date().toISOString();
    }
    if (adminNotes !== undefined) {
      alerts[index].adminNotes = adminNotes;
    }

    saveAlerts(alerts);
    res.json({
      success: true,
      message: `Alert ${req.params.id} updated successfully`,
      data: alerts[index],
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update alert' });
  }
});

export default router;
