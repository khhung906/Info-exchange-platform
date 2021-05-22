import { Router } from 'express';
import accountRouter from './account.js';

const router = Router();

router.use('/', accountRouter);

export default router;
