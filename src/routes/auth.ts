import { Router } from 'express';
import { signIn, signUp } from '../api/auth';

const router = Router();

router.post('/sign-in', signIn);
router.post('/sign-up', signUp);

export default router;
