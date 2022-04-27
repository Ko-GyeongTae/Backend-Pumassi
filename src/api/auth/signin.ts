import { Request, Response } from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { User } from '../../shared/entities/user.entity';
import { getConnection, getRepository } from 'typeorm';
import { Room } from '../../shared/entities/room.entity';

export const signIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const userRepository = getRepository(User);
  const queryRunner = getConnection().createQueryRunner();
  const connection = getConnection();
  await queryRunner.connect();

  const temp = await queryRunner.manager.query('SELECT * FROM user');
  console.log(temp);
  const _temp = await queryRunner.manager.find(User);
  console.log(_temp);
  const __temp = await userRepository.find();
  console.log(__temp);
  const ___temp = await getRepository(User)
    .createQueryBuilder('user')
    .getMany();
  console.log(___temp);

  const ____temp = await getRepository(User)
    .createQueryBuilder('user')
    .getRawMany();

  console.log(____temp);
  //const user = await userRepository.findOne({ where: { email } });

  // const queryRunner = getConnection().createQueryRunner();
  // await queryRunner.connect();

  const userList = await queryRunner.manager.query(
    `SELECT * FROM user WHERE email = '${email}' LIMIT 1`,
  );

  const user: User = userList[0];

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
