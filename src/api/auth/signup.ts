import { Request, Response } from 'express';
import crypto from 'crypto';
import { User } from '../../shared/entities/user.entity';
import { getConnection, getRepository } from 'typeorm';

export const signUp = async (req: Request, res: Response) => {
  const { email, name, password, entranceYear } = req.body;

  const userRepository = getRepository(User);

  //const user = await userRepository.findOne({ where: { email } });
  const queryRunner = getConnection().createQueryRunner();
  await queryRunner.connect();

  const userList = await queryRunner.manager.query(
    `SELECT * FROM user WHERE email = '${email}'`,
  );
  const user: User = userList[0];

  if (user) {
    res.status(400).json({
      message: '이미 동일한 이메일이 존재합니다.',
    });
    return;
  }

  const hash = crypto.createHash('sha512').update(password).digest('hex');

  const userObj = new User();
  userObj.email = email;
  userObj.name = name;
  userObj.password = hash;
  userObj.entranceYear = entranceYear;

  try {
    await userRepository.save(userObj);
  } catch (error) {
    res.status(400).json({
      message: '회원가입에 실패하였습니다',
    });
    return;
  } finally {
    res.status(201).json({
      message: '회원가입에 성공하였습니다.',
    });
    return;
  }
};
