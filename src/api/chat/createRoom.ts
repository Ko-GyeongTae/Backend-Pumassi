import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Room } from '../../shared/entities/room.entity';
import { User } from '../../shared/entities/user.entity';
import { UserRoom } from '../../shared/entities/user_room.entity';

export const createRoom = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { title } = req.body;
  const userRepository = await getRepository(User);
  const roomRepository = await getRepository(Room);
  const userRoomRepository = await getRepository(UserRoom);
  try {
    const room = await roomRepository.create({
      title,
    });
    console.log(room);
    const user = await userRepository.findOne({ where: { id: req.user.id } });
    const userRoom = await userRoomRepository.create({ user, room });
    console.log(userRoom);
  } catch (e) {
    res.status(400).json({ message: '채팅방 생성에 실패하였습니다.' }).end();
    return;
  }
  res.status(201).end();
};
