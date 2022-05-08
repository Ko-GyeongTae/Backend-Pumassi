import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';

export const getPostList = async (req: Request, res: Response) => {
  console.log(req.query);
  res.sendStatus(200);
};
