import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Asset } from '../../shared/entities/asset.entity';

export const uploadList = async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  let assets;

  if (files.length > 0) {
    assets = await Promise.all(
      files.map((f) => {
        return saveAsset(f);
      }),
    );
    res.status(201).json(assets);
  } else {
    res.status(400).json({ message: '파일 업로드에 실패했습니다.' });
  }
};

const saveAsset = async (file: Express.Multer.File): Promise<Asset> => {
  const assetRepository = getRepository(Asset);
  const asset = new Asset();
  asset.key = file.key;
  asset.location = file.location;
  return await assetRepository.save(asset);
};
