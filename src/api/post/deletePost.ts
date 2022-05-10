import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Post } from '../../shared/entities/post.entity';

export const deletePost = async (req: Request, res: Response) => {
  const postRepository = getRepository(Post);
  const { id } = req.params;

  const data = await postRepository.findOne({ where: { id } });
  if (!data?.deletedAt) {
    await postRepository.update({ id }, { deletedAt: new Date() });
    res.status(200).json({ message: '게시글을 삭제하는데 성공했습니다.' });
  } else {
    res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
  }
};
