import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Session } from '../../shared/entities/session.entity';

export const signOut = async (req: Request, res: Response): Promise<void> => {
  const sessionRepository = await getRepository(Session);
  try {
    await sessionRepository.delete(req.cookies.refreshToken);
  } catch (e) {
    res.status(400).json({ message: '로그아웃에 실패하였습니다.' });
    return;
  }
  res.status(200).clearCookie('accessToken').clearCookie('refreshToken');
};
