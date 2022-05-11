import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Session } from '../../shared/entities/session.entity';
import { User } from '../../shared/entities/user.entity';
import { createJWT } from '../../utils/jwt';
import jwt from 'jsonwebtoken';

export const refresh = async (req: Request, res: Response) => {
  const sessionRepository = getRepository(Session);
  const userRepository = getRepository(User);

  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res.status(401).json({ message: '로그인에 실패하였습니다.' });
    return;
  }

  const session = await sessionRepository.findOne({ where: { refreshToken } });
  if (!session) {
    res.status(401).json({ message: '로그인에 실패하였습니다.' });
    return;
  }

  const result = jwt.verify(session.refreshToken, process.env.JWT_SECRET);
  if (!result) {
    res.status(401).json({ message: '로그인에 실패하였습니다.' });
    return;
  }

  const user = await userRepository.findOne({
    where: { id: session.userId },
  });
  if (!user) {
    res.status(401).json({ message: '로그인에 실패하였습니다.' });
    return;
  }
  const accessToken = createJWT(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      entranceYear: user.entranceYear,
    },
    '3h',
  );
  const newRefreshToken = createJWT({}, '14d', 'HS512');

  await sessionRepository.update(
    { userId: user.id },
    { refreshToken: newRefreshToken },
  );

  res
    .status(200)
    .cookie('accessToken', accessToken, {
      maxAge: 1000 * 60 * 60 * 3,
    })
    .cookie('refreshToken', newRefreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 14,
      httpOnly: true,
    })
    .json({ message: '로그인에 성공하였습니다.' });
};
