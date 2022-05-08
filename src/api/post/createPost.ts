import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';

export const createPost = async (req: Request, res: Response) => {
  res.sendStatus(201);
};
