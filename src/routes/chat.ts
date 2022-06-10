import { Router } from 'express';
import { jwtMiddleware } from '../middleware/jwtMiddleware';
import { getRoomList } from '../api/chat';

const router = Router();

router.get('/list', jwtMiddleware, getRoomList);

export default router;
