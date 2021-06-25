import { Router } from 'express';
import accountRouter from './account.js';
import courseRouter from './course.js';
import mapRouter from './map.js'
const router = Router();

router.use('/', accountRouter);
router.use('/', courseRouter);
router.use('/', mapRouter);
export default router;
