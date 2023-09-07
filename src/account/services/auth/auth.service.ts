import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from 'src/account/dtos/auth/signUp.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly moduleRef: ModuleRef,
    private jwtService: JwtService,
  ) {}

  async signUp(side: string, payload: SignUpDto) {
    const service = this.moduleRef.get(`${side}Service`);
    return payload;
  }

  async generateToken({
    userId,
    email,
    side,
    role,
  }: {
    userId: string;
    email: string;
    side: string;
    role?: string;
  }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          _id: userId,
          email,
          side,
          role,
        },
        {
          secret: process.env.ACCESS_TOKEN_SECRET || 'access_secret',
          expiresIn: process.env.ACCESS_TOKEN_EXPIRE || '7days',
        },
      ),
      this.jwtService.signAsync(
        {
          _id: userId,
          email,
          side,
          role,
        },
        {
          secret: process.env.REFRESH_TOKEN_SECRET || 'refresh_secret',
          expiresIn: process.env.REFRESH_TOKEN_EXPIRE || '30days',
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
