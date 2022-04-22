import { Router } from 'express';
import { signIn, signUp } from '../api/auth';
import { SignInRequest, SignUpRequest } from '../shared/dto/auth.dto';
import { logMiddleware } from '../utils/logMiddleware';
import { validateMiddleware } from '../utils/validateMiddleware';

const router = Router();

router.post(
  '/sign-in',
  logMiddleware(),
  validateMiddleware(SignInRequest, '로그인 정보 입력 형식이 잘못되었습니다.'),
  signIn,
);
router.post(
  '/sign-up',
  validateMiddleware(
    SignUpRequest,
    '회원가입 정보 입력 형식이 잘못되었습니다.',
  ),
  signUp,
);

export default router;
