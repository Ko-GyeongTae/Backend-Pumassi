import { Router } from 'express';
import { refresh, signIn, signOut, signUp } from '../api/auth';
import { SignInRequest, SignUpRequest } from '../shared/dto/auth.dto';
import { validateBodyMiddleware } from '../middleware/validateMiddleware';

const router = Router();

router.post(
  '/sign-in',
  validateBodyMiddleware(
    SignInRequest,
    '로그인 정보 입력 형식이 잘못되었습니다.',
  ),
  signIn,
);
router.post(
  '/sign-up',
  validateBodyMiddleware(
    SignUpRequest,
    '회원가입 정보 입력 형식이 잘못되었습니다.',
  ),
  signUp,
);
router.put('/refresh', refresh);

router.get('/sign-out', signOut);

export default router;
