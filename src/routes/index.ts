import { Router } from 'express';
import asset from './asset';
import auth from './auth';
import post from './post';

const router = Router();

router.use('/auth', auth);
router.use('/post', post);
router.use('/asset', asset);

export default router;
