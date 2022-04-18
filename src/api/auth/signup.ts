import { Request, Response } from 'express';

export const signUp = async (req: Request, res: Response) => {
  const { body } = req;
  const { ip, method, originalUrl } = req;
  console.log(req.headers['user-agent']);
  console.log(body);
  res.sendStatus(201);
};
