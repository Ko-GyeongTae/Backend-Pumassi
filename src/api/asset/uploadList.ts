import { Request, Response } from 'express';

export const uploadList = async (req: Request, res: Response) => {
  if (req.files) {
    res.status(201).json(req.files);
  } else {
    res.sendStatus(400);
  }
};
