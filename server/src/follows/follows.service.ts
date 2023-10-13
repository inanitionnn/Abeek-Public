import { Inject, Injectable, Logger } from '@nestjs/common';
import { BadRequestError, InternalServerError } from 'src/shared/errors';
import { FollowResponse, GetFollowInput, getFollowInfoResponse } from './dto';
import { NotificationEnum } from 'src/shared/enums';
import { NotificationsService } from 'src/notifications/notifications.service';
import { SuccessResponse } from 'src/shared/dto';

@Injectable()
export class FollowsService {
  constructor(
    @Inject('PG_CONNECTION') private db,
    private notificationsService: NotificationsService,
  ) {}

  private readonly logger = new Logger(FollowsService.name);

  public async getFollow(
    userId: string,
    followId: string,
  ): Promise<{ id: string; userId: string; followId: string }> {
    try {
      this.logger.log('Get follow (start)');

      const getFollowQuery = {
        text: `
        SELECT * FROM "follows"
        WHERE "userId" = $1 AND "followId" = $2
        `,
        values: [userId, followId],
      };

      this.logger.debug(`Executing query: (getFollowQuery)`);
      const res = await this.db.query(getFollowQuery);

      this.logger.log('Get follow (end)');
      return res.rows[0];
    } catch (error) {
      this.logger.error('Get follow error', error);
      throw new InternalServerError('Get follow  error');
    }
  }

  public async addFollow(
    userId: string,
    followId: string,
  ): Promise<SuccessResponse> {
    this.logger.log('Add follow (start)');

    if (userId === followId) {
      this.logger.warn('Add follow error');
      throw new BadRequestError('You cant follow to yourself');
    }

    const oldFollow = await this.getFollow(userId, followId);
    if (oldFollow) {
      this.logger.warn('Add follow error');
      throw new BadRequestError('You are already followed');
    }

    try {
      const addFollowQuery = {
        text: `
        INSERT INTO "follows" ("userId", "followId") 
        VALUES ($1, $2)
        `,
        values: [userId, followId],
      };

      this.logger.debug(`Executing query: (addFollowQuery)`);
      await this.db.query(addFollowQuery);

      await this.notificationsService.addNotification({
        type: NotificationEnum.follow,
        followerId: followId,
        userId: userId,
      });

      this.logger.log('Add follow (end)');
      return {
        success: true,
      };
    } catch (error) {
      this.logger.error('Add follow error', error);
      throw new InternalServerError('Add follow  error');
    }
  }

  public async removeFollow(
    userId: string,
    followId: string,
  ): Promise<SuccessResponse> {
    this.logger.log('Remove follow (start)');

    const oldFollow = await this.getFollow(userId, followId);
    if (!oldFollow) {
      this.logger.warn('Add follow error');
      throw new BadRequestError('You are already unfollowed');
    }
    try {
      const removeFollowQuery = {
        text: `
        DELETE FROM "follows"
        WHERE "userId" = $1 AND "followId" = $2
        `,
        values: [userId, followId],
      };

      this.logger.debug(`Executing query: (removeFollowQuery)`);
      await this.db.query(removeFollowQuery);

      await this.notificationsService.addNotification({
        type: NotificationEnum.unfollow,
        followerId: followId,
        userId: userId,
      });

      this.logger.log('Remove follow (end)');
      return {
        success: true,
      };
    } catch (error) {
      this.logger.error('Remove follow error', error);
      throw new InternalServerError('Remove follow error');
    }
  }

  public async getFollowInfo(
    dto: GetFollowInput,
  ): Promise<getFollowInfoResponse> {
    this.logger.log('Get follow public info (start)');
    const { followId, userId } = dto;
    let res;
    try {
      if (!userId) {
        const getFollowPublicInfoQuery = {
          text: `
          SELECT
              u.id AS id,
              u.name AS name,
              u.picture as picture,
              u.note AS note,
              COUNT(CASE WHEN um."mediaType" = 'film' THEN 1 ELSE NULL END) AS "filmCount",
              COUNT(CASE WHEN um."mediaType" = 'series' THEN 1 ELSE NULL END) AS "seriesCount",
              COUNT(CASE WHEN um."mediaType" = 'comics' THEN 1 ELSE NULL END) AS "comicsCount",
              COUNT(CASE WHEN um."mediaType" = 'book' THEN 1 ELSE NULL END) AS "bookCount"
          FROM
              users u
          LEFT JOIN
              "userMedia" um ON u.id = um."userId"
          WHERE
              u.id = $1
          GROUP BY
              u.id, u.name, u.picture;
          `,
          values: [followId],
        };

        this.logger.debug(`Executing query: (getFollowPublicInfoQuery)`);
        res = await this.db.query(getFollowPublicInfoQuery);
      } else {
        const oldFollow = await this.getFollow(userId, followId);
        const getUserInfoQuery = {
          text: `
          SELECT
              u.id AS id,
              u.name AS name,
              u.picture as picture,
              u.note AS note,
              COUNT(CASE WHEN um."mediaType" = 'film' THEN 1 ELSE NULL END) AS "filmCount",
              COUNT(CASE WHEN um."mediaType" = 'series' THEN 1 ELSE NULL END) AS "seriesCount",
              COUNT(CASE WHEN um."mediaType" = 'comics' THEN 1 ELSE NULL END) AS "comicsCount",
              COUNT(CASE WHEN um."mediaType" = 'book' THEN 1 ELSE NULL END) AS "bookCount",
              CASE WHEN f."id" IS NOT NULL THEN TRUE ELSE FALSE END AS "follow"
          FROM
              users u
          LEFT JOIN
              "userMedia" um ON u.id = um."userId"
          LEFT JOIN
              "follows" f ON f."followId" = u.id AND f."userId" = $2
          WHERE
              u.id = $1 
          GROUP BY
              u.id, u.name, u.picture, u.note, f."id";
          `,
          values: [followId, userId],
        };

        this.logger.debug(`Executing query: (getUserInfoQuery)`);
        res = await this.db.query(getUserInfoQuery);
        console.log(res.rows[0]);
      }
    } catch (error) {
      this.logger.error('Get follow public info (error)', error);
      throw new InternalServerError('Get follow public info error');
    }

    this.logger.log('Get follow public info (end)');
    return res.rows[0];
  }

  public async getUserFollows(userId: string): Promise<FollowResponse[]> {
    try {
      this.logger.log('Get user follows (start)');
      const getUserFollowsQuery = {
        text: `
          select u.id, u.picture, u.name from "users" u
          LEFT JOIN "follows" f ON u."id" = f."followId"
          WHERE f."userId" = $1
          `,
        values: [userId],
      };

      this.logger.debug(`Executing query: (getUserFollowsQuery)`);
      const res = await this.db.query(getUserFollowsQuery);
      this.logger.log('Get user follows (end)');
      return res.rows;
    } catch (error) {
      this.logger.error('Get fuser follows (error)', error);
      throw new InternalServerError('Get user follows error');
    }
  }

  public async getUserFollowers(userId: string): Promise<FollowResponse[]> {
    try {
      this.logger.log('Get user followers (start)');
      const getUserFollowersQuery = {
        text: `
          select u.id, u.picture, u.name from "users" u
          LEFT JOIN "follows" f ON u."id" = f."userId"
          WHERE f."followId" = $1
          `,
        values: [userId],
      };

      this.logger.debug(`Executing query: (getUserFollowersQuery)`);
      const res = await this.db.query(getUserFollowersQuery);
      this.logger.log('Get user followers (end)');
      return res.rows;
    } catch (error) {
      this.logger.error('Get fuser followers (error)', error);
      throw new InternalServerError('Get user followers error');
    }
  }
}
