import { Type } from 'class-transformer';
import { IsInt, IsString, Min } from 'class-validator';

export class getPostListQueryDTO {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  take: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: string;
}

export class createPostDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  reward: string;
}

export class updatePostDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  reward: string;
}
