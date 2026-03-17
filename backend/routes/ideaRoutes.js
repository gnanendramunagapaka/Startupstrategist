import express from 'express';
import { generateIdea } from '../controllers/ideaController.js';

const router = express.Router();

// The user requested POST /api/idea/generate
router.post('/generate', generateIdea);

export default router;
