import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as uuid from 'uuid';
import { ITokens } from '../interfaces/tokens.interface';
import { UsersService } from 'src/users/users.service';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from 'src/shared/errors';
import { User } from 'src/shared/dto';

@Injectable()
export class TokensService {
  constructor(
    @Inject('PG_CONNECTION') private db,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  private readonly logger = new Logger(TokensService.name);

  public async generateTokens(
    user: User,
    uniqueId: string,
    notificationCount: number,
  ): Promise<ITokens> {
    this.logger.log('Generate tokens (start)');
    const accessToken = await this.generateAccessToken(user, notificationCount);
    const refreshToken = await this.generateRefreshToken(user.id, uniqueId);
    this.logger.log('Generate tokens (end)');
    return { accessToken, refreshToken };
  }

  public async updateTokens(
    user: User,
    uniqueId: string,
    notificationCount: number,
  ): Promise<ITokens> {
    try {
      this.logger.log('Update tokens (start)');
      const accessToken = await this.generateAccessToken(
        user,
        notificationCount,
      );
      const refreshToken = await this.updateRefreshToken(user.id, uniqueId);

      this.logger.log('Update tokens (end)');
      return { accessToken: accessToken, refreshToken: refreshToken };
    } catch (error) {
      this.logger.error('Updating tokens error', error);
      throw new InternalServerError('Updating tokens error');
    }
  }

  public async deleteRefreshToken(refreshToken: string) {
    try {
      this.logger.log('Delete refresh token (start)');
      const deleteRefreshTokenQuery = {
        text: `
          DELETE FROM "tokens"
          WHERE "token" = (
            SELECT "token"
            FROM "tokens"
            WHERE "token" = $1
            LIMIT 1
          )`,
        values: [refreshToken],
      };
      this.logger.debug(`Executing query: (deleteRefreshTokenQuery)`);
      await this.db.query(deleteRefreshTokenQuery);
      this.logger.log('Delete refresh token (end)');
    } catch (error) {
      this.logger.error('Delete refresh token error', error);
      throw new InternalServerError('Delete refresh token error');
    }
  }

  public async deleteAllRefreshTokens(userId: string) {
    try {
      this.logger.log('Delete all refresh tokens (start)');
      const deleteAllRefreshTokenQuery = {
        text: `
        DELETE FROM "tokens"
        WHERE "userId" = $1`,
        values: [userId],
      };
      this.logger.debug(`Executing query: (deleteAllRefreshTokenQuery)`);
      await this.db.query(deleteAllRefreshTokenQuery);
      this.logger.log('Delete all refresh tokens (end)');
    } catch (error) {
      this.logger.error('Deleting all refresh tokens error', error);
      throw new InternalServerError('Deleting all refresh tokens error');
    }
  }

  public async validRefreshToken(refreshToken: string): Promise<User> {
    this.logger.log('Validate refresh token (start)');

    const validateRefreshTokenQuery = {
      text: `
      SELECT *
      FROM "tokens"
      WHERE "token" = $1`,
      values: [refreshToken],
    };
    this.logger.debug(`Executing query: (validateRefreshTokenQuery)`);
    const result = await this.db.query(validateRefreshTokenQuery);
    this.logger
      .verbose`Refresh token: (${refreshToken}). Result: (${result.rows})`;
    const refreshTokenUser = result.rows[0];
    if (!refreshTokenUser) {
      this.logger.warn('Not found refresh token');
      throw new NotFoundError('Not found refresh token');
    }

    const expiresIn = +process.env.JWT_REFRESH_TOKEN_EXPIRATION * 1000;
    const now = Date.now();
    const createdAt = refreshTokenUser.createdAt.getTime();
    if (now - createdAt > expiresIn) {
      this.logger.warn('Expires in error');
      throw new BadRequestError('Expires in error');
    }
    const user = await this.userService.getUserById(refreshTokenUser.userId);

    if (!user) {
      this.logger.warn('User not found');
      throw new NotFoundError('User not found');
    }
    this.logger.log('Validate refresh token (end)');
    return user;
  }

  private async generateAccessToken(
    user: User,
    notificationCount: number,
  ): Promise<string> {
    this.logger.log('Generate access token (start)');
    const payload = {
      id: user.id,
      role: user.role,
      mediaTokens: user.mediaTokens,
      additionalMediaTokens: user.additionalMediaTokens,
      notificationCount: notificationCount,
    };
    this.logger.log('Generate access token (end)');
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
    });
  }

  private async generateRefreshToken(
    userId: string,
    uniqueId: string,
  ): Promise<string> {
    try {
      this.logger.log('Generate refresh token (start)');
      this.logger.log('Check if not unique and delete');
      const notUniqueQuery = {
        text: `
        DELETE FROM "tokens"
        WHERE "uniqueId" = $1 AND "userId" = $2`,
        values: [uniqueId, userId],
      };
      this.logger.debug(`Executing query: (notUniqueQuery)`);
      await this.db.query(notUniqueQuery);

      // TODO in single query

      // // Check if not Google and delete
      // const googleQuery = {
      //   text: `
      //   DELETE FROM "tokens"
      //   WHERE uniqueId = 'fa6b91b2-cefb-11ed-afa1-0242ac120002' AND userId = $1`,
      //   values: [userId],
      // };
      // await this.db.query(googleQuery);

      this.logger.log('Count refresh tokens');
      const countQuery = {
        text: `
        SELECT COUNT(*) AS count
        FROM "tokens"
        WHERE "userId" = $1`,
        values: [userId],
      };
      this.logger.debug(`Executing query: (countQuery)`);
      const countResult = await this.db.query(countQuery);
      const countRefreshTokens = countResult.rows[0].count;

      if (countRefreshTokens == 3) {
        this.logger.log('Delete oldest token if count is 3');
        const deleteOldestQuery = {
          text: `
          DELETE FROM "tokens"
          WHERE token = (
            SELECT "token"
            FROM "tokens"
            WHERE "userId" = $1
            ORDER BY "createdAt" ASC
            LIMIT 1
          )`,
          values: [userId],
        };
        this.logger.debug(`Executing query: (deleteOldestQuery)`);
        await this.db.query(deleteOldestQuery);
      }

      if (countRefreshTokens > 3) {
        this.logger.log('Delete all tokens if count is greater than 3');
        const deleteAllTokensQuery = {
          text: `
          DELETE FROM "tokens"
          WHERE "userId" = $1`,
          values: [userId],
        };
        this.logger.debug(`Executing query: (deleteAllTokensQuery.text})`);
        await this.db.query(deleteAllTokensQuery);
      }

      const refreshToken = uuid.v4();
      this.logger.log('Add new refresh token');
      const createTokenQuery = {
        text: `
        INSERT INTO "tokens" ("userId", "token", "uniqueId")
        VALUES ($1, $2, $3)`,
        values: [userId, refreshToken, uniqueId],
      };
      this.logger.debug(`Executing query: (createTokenQuery)`);
      await this.db.query(createTokenQuery);
      this.logger.log('Generate refresh token (end)');
      return refreshToken;
    } catch (error) {
      this.logger.error('Creating refresh token error', error);
      throw new InternalServerError('Creating refresh token error');
    }
  }

  private async updateRefreshToken(
    userId: string,
    uniqueId: string,
  ): Promise<string> {
    try {
      this.logger.log('Update refresh token (start)');
      this.logger.verbose(`User id: (${userId}). Unique id: (${uniqueId}).`);
      this.logger.log('Delete old token by uniqueId and userId');
      const deleteTokenQuery = {
        text: `
        DELETE FROM "tokens"
        WHERE "uniqueId" = $1 AND "userId" = $2`,
        values: [uniqueId, userId],
      };
      this.logger.debug(`Executing query: (deleteTokenQuery)`);
      await this.db.query(deleteTokenQuery);

      // TODO in single query

      // // Check if not Google and delete
      // const googleQuery = {
      //   text: `
      //   DELETE FROM "tokens"
      //   WHERE uniqueId = 'fa6b91b2-cefb-11ed-afa1-0242ac120002' AND userId = $1`,
      //   values: [userId],
      // };
      // await this.db.query(googleQuery);

      const refreshToken = uuid.v4();

      this.logger.log('Add new refresh token');
      const createTokenQuery = {
        text: `
        INSERT INTO "tokens" ("userId", "token", "uniqueId")
        VALUES ($1, $2, $3)`,
        values: [userId, refreshToken, uniqueId],
      };
      this.logger.debug(`Executing query: (createTokenQuery)`);
      await this.db.query(createTokenQuery);
      this.logger.log('Update refresh token (end)');
      return refreshToken;
    } catch (error) {
      this.logger.error('Updating refresh token error', error);
      throw new InternalServerError('Updating refresh token error');
    }
  }
}
