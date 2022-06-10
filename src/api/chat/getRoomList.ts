import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { UserRoom } from '../../shared/entities/user_room.entity';

export const getRoomList = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userRoomRepository = await getRepository(UserRoom);
  const list = await userRoomRepository.find({
    where: { uid: req.user.id, deletedAt: null },
  });
  res.status(200).json(list).end();
};
