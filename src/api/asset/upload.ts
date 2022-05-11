import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Asset } from '../../shared/entities/asset.entity';

export const upload = async (req: Request, res: Response) => {
  const assetRepository = getRepository(Asset);
  const { file } = req;
  if (file) {
    const asset = new Asset();
    asset.key = file.key;
    asset.location = file.location;
    await assetRepository.save(asset);
    res.status(201).json(asset);
  } else {
    res.status(400).json({ message: '파일 업로드에 실패했습니다.' });
  }
};
