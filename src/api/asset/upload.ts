import { Request, Response } from 'express';

export const upload = async (req: Request, res: Response) => {
  if (req.file) {
    res.status(201).json(req.file);
  } else {
    res.sendStatus(400);
  }
};
