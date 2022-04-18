import { validateOrReject } from 'class-validator';
import { Request, Response } from 'express';
import { SignInRequest } from '../../shared/dto/auth.dto';

export const signIn = async (req: Request, res: Response): Promise<void> => {
  const { body } = req;

  const data = new SignInRequest();
  data.email = body.email;
  data.password = body.password;

  validateOrReject(data)
    .then((r) => {
      console.log(r);
      res.status(200).json({ message: 'success' });
    })
    .catch((e) => {
      console.log(e);
      res.status(400).json({ message: '입력 형식이 올바르지 않습니다.' });
    });
};
