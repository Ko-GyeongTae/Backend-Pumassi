import { Router } from 'express';
import { jwtMiddleware } from '../middleware/jwtMiddleware';
import { createRoom, getRoomList } from '../api/chat';
import { CreateRoomDto } from '../shared/dto/chat.dto';
import { validateBodyMiddleware } from '../middleware/validateMiddleware';

const router = Router();

router.use(jwtMiddleware);
router.post(
  '/',
  validateBodyMiddleware(CreateRoomDto, '채팅방 생성 형식이 잘못되었습니다.'),
  createRoom,
);
router.get('/list', getRoomList);

export default router;
