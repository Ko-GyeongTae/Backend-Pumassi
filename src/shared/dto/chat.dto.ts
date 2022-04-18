import { IsJSON, IsString } from 'class-validator';

export class setInitDTO {
  @IsString()
  nickname: string;

  @IsJSON()
  room: Room;
}

export class chatRoomListDTO {
  @IsString()
  roomId: string;

  @IsString()
  cheifId: string;

  @IsString()
  roomName: string;
}

class Room {
  @IsString()
  roomId: string;

  @IsString()
  roomName: string;
}
