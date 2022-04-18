import { Request, Response } from 'express';

export const signIn = (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).json({ message: 'success' });
};
