import { Router } from 'express';
import asset from './asset';
import auth from './auth';
import chat from './chat';
import post from './post';

const router = Router();

router.use('/auth', auth);
router.use('/post', post);
router.use('/chat', chat);
router.use('/asset', asset);

export default router;
