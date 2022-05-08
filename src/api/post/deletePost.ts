import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';

export const deletePost = async (req: Request, res: Response) => {
  console.log(req.headers);
  res.sendStatus(200);
};
