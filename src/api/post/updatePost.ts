import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { updatePostDTO } from '../../shared/dto/post.dto';
import { Post } from '../../shared/entities/post.entity';

export const updatePost = async (req: Request, res: Response) => {
  const postRepository = getRepository(Post);
  const { id } = req.params;
  const { title, content, reward, assets } = req.body as updatePostDTO;

  const post = new Post();
  post.title = title;
  post.content = content;
  post.reward = reward;
  post.assets = assets;
  await postRepository.update(id, post);
  res.status(201).json(post);
};
