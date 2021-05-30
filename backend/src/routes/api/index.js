import { Router } from 'express';
import accountRouter from './account.js';
import courseRouter from './course.js';
const router = Router();

router.use('/', accountRouter);
router.use('/', courseRouter);
export default router;
