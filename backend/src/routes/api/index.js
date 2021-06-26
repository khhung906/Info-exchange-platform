import { Router } from 'express';
import accountRouter from './account.js';
import courseRouter from './course.js';
import examRouter from './exam.js';
const router = Router();

router.use('/', accountRouter);
router.use('/', courseRouter);
router.use('/', examRouter);
export default router;
