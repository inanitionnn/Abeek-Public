import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { TokensService } from 'src/auth/tokens/tokens.service';
import { BadRequestError } from 'src/shared/errors';
dotenv.config();

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh',
) {
  constructor(private tokensService: TokensService) {
    super({
      ignoreExpiration: true,
      passReqToCallback: true,
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(req: Request) {
    const data = req?.cookies['auth-cookie'];
    if (!data) {
      throw new BadRequestError('Invalid refresh token');
    }
    const user = await this.tokensService.validRefreshToken(data);
    if (user == null) {
      throw new BadRequestError('Token expires in');
    }
    return user;
  }
}
