import { Body, Controller, Post } from '@nestjs/common';
import { SignInRequest, SignUpRequest } from 'src/shared/dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() body: SignInRequest) {
    return this.authService.login(body);
  }

  @Post('sign-up')
  signUp(@Body() body: SignUpRequest) {
    return this.authService.signUp(body);
  }
}
