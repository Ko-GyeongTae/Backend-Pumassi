import { IsEmail, IsString } from 'class-validator';

export class SignInRequest {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class SignUpRequest {
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  entranceYear: number;
}
