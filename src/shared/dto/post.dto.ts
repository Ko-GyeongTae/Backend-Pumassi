import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString, Min } from 'class-validator';
import { Asset } from '../entities/asset.entity';

export class getPostListQueryDTO {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly take: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly page: number;
}

export class createPostDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  reward: string;

  @IsArray()
  assets: Asset[];
}

export class updatePostDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  reward: string;

  @IsArray()
  assets: Asset[];
}
