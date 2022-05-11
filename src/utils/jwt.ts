import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../shared/entities/user.entity';

export const createJWT = (
  payload: object,
  expiresIn: string,
  algorithm?: string,
): string => {
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn,
    },
    algorithm,
  );
  return token;
};

export const verifyJWT = async (token: string) => {
  const userRepository = getRepository(User);
  let data;
  try {
    data = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e: any) {
    return {
      success: false,
      message: e.message,
    };
  }

  const user = await userRepository.findOne({ where: { id: data.id } });
  if (!user) {
    return {
      success: false,
      message: 'User not found',
    };
  } else {
    user.password = '';
    return {
      success: true,
      data: user,
    };
  }
};
