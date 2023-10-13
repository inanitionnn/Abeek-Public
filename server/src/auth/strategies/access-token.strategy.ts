import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { UnauthenticatedError } from 'src/shared/errors';
dotenv.config();

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any) {
    if (payload == null) {
      throw new UnauthenticatedError();
    }
    return payload;
  }
}
