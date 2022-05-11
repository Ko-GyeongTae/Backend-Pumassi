import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { createPostDTO } from '../../shared/dto/post.dto';
import { Post } from '../../shared/entities/post.entity';

export const createPost = async (req: Request, res: Response) => {
  const postRepository = getRepository(Post);
  const { title, content, reward, assets } = req.body as createPostDTO;

  const post = new Post();
  post.title = title;
  post.content = content;
  post.reward = reward;
  post.assets = assets;
  await postRepository.save(post);
  res.status(201).json(post);
};
