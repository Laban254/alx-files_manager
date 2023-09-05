import express from 'express';
import AppController from '../controllers/AppController.js';

const router = express.Router();

// Define the GET /status endpoint
router.get('/status', AppController.getStatus);

// Define the GET /stats endpoint
router.get('/stats', AppController.getStats);

export default router;

