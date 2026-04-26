import express from 'express';
import { generateBio } from '../controllers/aiController.js';

const aiRouter = express.Router();

aiRouter.post('/generate-bio', generateBio);

export default aiRouter;
