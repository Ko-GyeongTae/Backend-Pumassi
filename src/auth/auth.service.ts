import { Injectable } from '@nestjs/common';
import { SignInRequest, SignUpRequest } from 'src/shared/dto/auth.dto';

@Injectable()
export class AuthService {
  async login(body: SignInRequest) {
    const res = {
      accessToken: '1',
      refreshToken: '2',
    };
    console.log(body);
    return res;
  }

  async signUp(body: SignUpRequest) {
    return body;
  }
}
