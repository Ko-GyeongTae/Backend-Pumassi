import { Request } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import { s3 } from '../utils/s3';
import * as dotenv from 'dotenv';
dotenv.config();

export const multerMiddleware = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    key: (req: Request, file: any, cb: any) => {
      const extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension);
    },
    acl: 'public-read-write',
  }),
  limits: {
    fileSize: 1024 * 1024 * 1024,
  },
});
