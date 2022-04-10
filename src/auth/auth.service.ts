import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInRequest, SignUpRequest } from 'src/shared/dto/auth.dto';
import { Auth } from 'src/shared/entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const HASH_LENGTH = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async login(body: SignInRequest) {
    const user = await this.authRepository.findOne({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        '아이디 또는 비밀번호가 일치하지 않습니다.',
      );
    }

    const isEqual = await bcrypt.compare(body.password, user.password);

    if (!isEqual) {
      throw new UnauthorizedException(
        '아이디 또는 비밀번호가 일치하지 않습니다.',
      );
    }

    const { email, name, entranceYear, grade } = user;

    const accessToken = this.jwtService.sign(
      {
        email,
        name,
        entranceYear,
        grade,
      },
      {
        expiresIn: 1000 * 60 * 60 * 3, // 3 hours
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        accessToken,
      },
      {
        expiresIn: 1000 * 60 * 60 * 24 * 7, // 1 week
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp(body: SignUpRequest) {
    const { email, password, name, entranceYear } = body;

    const user = await this.authRepository.findOne({
      where: {
        email,
      },
    });

    if (user) {
      throw new BadRequestException('이미 계정이 존재합니다.');
    }

    const hash = await bcrypt.hash(password, HASH_LENGTH);
    console.log(hash);

    const now = new Date().getFullYear();

    const data = await this.authRepository.create({
      email,
      name,
      entranceYear,
      grade: now + 1 - entranceYear,
      password: hash,
    });

    console.log(data);
    return {
      status: HttpStatus.CREATED,
    };
  }
}
