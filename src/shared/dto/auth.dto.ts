import { IsEmail, IsNumber, IsString } from 'class-validator';

export class SignInRequest {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class SignUpRequest {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsNumber()
  entranceYear: number;
}
