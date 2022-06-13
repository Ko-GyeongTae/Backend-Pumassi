import { IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  title: string;
}
