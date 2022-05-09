import { Router } from 'express';
import { upload } from '../api/asset';
import { fileValidator } from '../middleware/fileValidator';
import { multerMiddleware } from '../middleware/multerMiddleware';

const router = Router();

router.post('/upload', fileValidator, multerMiddleware.single('file'), upload);

export default router;
