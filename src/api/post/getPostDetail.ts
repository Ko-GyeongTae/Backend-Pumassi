import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Post } from '../../shared/entities/post.entity';

export const getPostDetail = async (req: Request, res: Response) => {
  const postRepository = getRepository(Post);
  const { id } = req.params;

  const data = await postRepository.findOne({ where: { id } });
  if (!data) {
    res.status(404).json({ message: '게시물을 찾을 수 없습니다.' });
  }
  res.status(200).json(data);
};
