import { Router } from 'express';
import {
  validateBodyMiddleware,
  validateQueryMiddleware,
} from '../middleware/validateMiddleware';
import {
  createPost,
  deletePost,
  getPostDetail,
  getPostList,
} from '../api/post';
import {
  createPostDTO,
  getPostListQueryDTO,
  updatePostDTO,
} from '../shared/dto/post.dto';

const router = Router();

router.post(
  '/',
  validateBodyMiddleware(createPostDTO, '게시글 정보 형식이 잘못되었습니다.'),
  createPost,
);
router.get(
  '/list',
  validateQueryMiddleware(
    getPostListQueryDTO,
    '게시글 정보 요청 형식이 잘못되었습니다.',
  ),
  getPostList,
);
router.get('/:id', getPostDetail);
router.put(
  '/:id',
  validateBodyMiddleware(updatePostDTO, '게시글 정보 형식이 잘못되었습니다.'),
);
router.delete('/:id', deletePost);
export default router;
