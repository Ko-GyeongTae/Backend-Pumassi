import { Request, Response } from 'express';

export const signIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  res.json({
    email,
    password,
  });
};
