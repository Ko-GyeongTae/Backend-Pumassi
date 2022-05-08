import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

export const getPostDetail = async (req: Request, res: Response) => {
  console.log(req.params);
  res.sendStatus(200);
};
