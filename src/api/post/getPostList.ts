import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { getPostListQueryDTO } from '../../shared/dto/post.dto';
import { Post } from '../../shared/entities/post.entity';

export const getPostList = async (req: Request, res: Response) => {
  const postRepository = getRepository(Post);
  const { take, page } = req.query as unknown as getPostListQueryDTO;

  const postList = await postRepository.find({
    take: take,
    skip: take * (page - 1),
    where: { deletedAt: null },
    order: { createdAt: 'DESC' },
  });
  res.status(200).json(postList);
};
