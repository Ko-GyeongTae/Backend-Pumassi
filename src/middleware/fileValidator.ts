import { Request, Response, NextFunction } from 'express';

export const fileValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const file = req.file;
  const ext = file?.mimetype.split('/')[1];
  if (!['png', 'jpg', 'jpeg', 'gif', 'bmp'].includes(ext + '')) {
    res.status(400).json({ message: '지원하지 않는 파일 형식입니다.' });
  } else {
    next();
  }
};
