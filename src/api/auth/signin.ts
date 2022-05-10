import { Request, Response } from 'express';
import crypto from 'crypto';
import { User } from '../../shared/entities/user.entity';
import { getRepository } from 'typeorm';
import { Session } from '../../shared/entities/session.entity';
import { createJWT } from '../../utils/jwt';

export const signIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const userRepository = getRepository(User);
  const sessionRepository = getRepository(Session);

  const user = await userRepository.findOne({ where: { email } });

  if (!user) {
    res.status(401).json({
      message: '이메일 혹은 비밀번호가 잘못되었습니다.',
    });
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
  const refreshToken = createJWT({}, '14d', 'HS512');

  const hash = crypto.createHash('sha512').update(password).digest('hex');

  if (user.password === hash) {
    await sessionRepository.delete({ userId: user.id });
    const session = new Session();
    session.userId = user.id;
    session.refreshToken = refreshToken;
    sessionRepository.save(session);
    res
      .status(200)
      .cookie('accessToken', accessToken, {
        maxAge: 1000 * 60 * 60 * 3,
      })
      .cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 14,
        httpOnly: true,
      })
      .json({
        message: '로그인에 성공하였습니다.',
      });
    return;
  } else {
    res.status(401).json({
      message: '이메일 혹은 비밀번호가 잘못되었습니다.',
    });
    return;
  }
};
