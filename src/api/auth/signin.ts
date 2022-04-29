import { Request, Response } from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { User } from '../../shared/entities/user.entity';
import { getRepository } from 'typeorm';

export const signIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const userRepository = getRepository(User);

  const user = await userRepository.findOne({ where: { email } });

  if (!user) {
    res.status(401).json({
      message: '이메일 혹은 비밀번호가 잘못되었습니다.',
    });
    return;
  }

  const accessToken = jwt.sign(
    {
      email: user.email,
      name: user.name,
      entranceYear: user.entranceYear,
    },
    'jsonwebtokenSecret',
    {
      expiresIn: '3h',
    },
  );

  const refreshToken = jwt.sign({ accessToken }, 'jsonwebtokenSecret', {
    algorithm: 'HS512',
    expiresIn: '14d',
  });

  const hash = crypto.createHash('sha512').update(password).digest('hex');

  if (user.password === hash) {
    res.status(200).json({
      accessToken,
      refreshToken,
    });
    return;
  } else {
    res.status(401).json({
      message: '이메일 혹은 비밀번호가 잘못되었습니다.',
    });
  }
};
