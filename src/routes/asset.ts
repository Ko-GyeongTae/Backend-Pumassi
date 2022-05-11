import { Router } from 'express';
import { upload, uploadList } from '../api/asset';
import { jwtMiddleware } from '../middleware/jwtMiddleware';
import { multerMiddleware } from '../middleware/multerMiddleware';

const router = Router();

router.use(jwtMiddleware);
router.post('/', multerMiddleware.single('file'), upload);
router.post('/list', multerMiddleware.array('files', 10), uploadList);

export default router;
