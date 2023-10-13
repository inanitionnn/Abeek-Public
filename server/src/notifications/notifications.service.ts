import { Inject, Injectable, Logger } from '@nestjs/common';
import { SuccessResponse } from 'src/shared/dto';
import { NotificationEnum } from 'src/shared/enums';
import { InternalServerError } from 'src/shared/errors';
import { NotificationResponse } from './dto';
import { addNotificationProps } from './types/addNotificationProps.type';

@Injectable()
export class NotificationsService {
  constructor(@Inject('PG_CONNECTION') private db) {}

  private readonly logger = new Logger(NotificationsService.name);

  public async addNotification(props: addNotificationProps) {
    const { type, followerId, isAllUser, notification, userId } = props;
    this.logger.log('Add notification (start)');

    try {
      if (
        followerId &&
        userId &&
        (type === NotificationEnum.follow || type === NotificationEnum.unfollow)
      ) {
        const updateNotificationQuery = {
          text: `
          WITH deleted_notifications AS (
            DELETE FROM notifications
            WHERE (type = '${NotificationEnum.follow}' OR type = '${NotificationEnum.unfollow}') 
            AND "userId" = $2 AND "followerId" = $3
            RETURNING *
          )
          INSERT INTO notifications (type, "userId", "followerId")
          VALUES ($1, $2, $3);`,
          values: [type, userId, followerId],
        };

        this.logger.debug(`Executing query: (updateNotificationQuery)`);
        await this.db.query(updateNotificationQuery);
      } else if (isAllUser) {
        const addNotificationQuery = {
          text: `
          INSERT INTO notifications (type, 
              "userId"
              ${followerId ? `, "followerId"` : ''} 
              ${notification ? `, "notification"` : ''})
          SELECT $1 as "type", 
              id,  
              ${followerId ? `, '${followerId}'` : ''} 
              ${notification ? `, '${notification}'` : ''}
          FROM users;`,
          values: [type],
        };

        this.logger.debug(`Executing query: (addNotificationQuery)`);
        await this.db.query(addNotificationQuery);
      } else if (userId) {
        const addNotificationQuery = {
          text: `
            INSERT INTO notifications 
            ("type",
            "userId" 
            ${followerId ? `, "followerId"` : ''} 
            ${notification ? `, "notification"` : ''})
            VALUES ($1, $2 
              ${followerId ? `, '${followerId}'` : ''} 
              ${notification ? `, '${notification}'` : ''})`,
          values: [type, userId],
        };

        this.logger.debug(`Executing query: (addNotificationQuery)`);
        await this.db.query(addNotificationQuery);
      }
    } catch (error) {
      this.logger.error('Add notification  error', error);
      throw new InternalServerError('Add notification error');
    }
    this.logger.log('Add notification (end)');
  }

  public async setAllNotificationWatched(
    userId: string,
  ): Promise<SuccessResponse> {
    try {
      this.logger.log('Set all notifications watched (start)');

      const setAllWatchedNotificationsQuery = {
        text: `
        UPDATE "notifications" 
        SET "isWatched" = 'true'
        WHERE "userId" = $1`,
        values: [userId],
      };

      this.logger.debug(`Executing query: (setAllWatchedNotificationsQuery)`);
      this.db.query(setAllWatchedNotificationsQuery);
      this.logger.log('Set all notifications watched (end)');
      return {
        success: true,
      };
    } catch (error) {
      this.logger.error('Set all notifications watched error', error);
      throw new InternalServerError('Set all watched error');
    }
  }

  public async getNotifications(
    userId: string,
  ): Promise<NotificationResponse[]> {
    try {
      this.logger.log('Get user notification (start)');

      const getUserNotificationsQuery = {
        text: `
        SELECT notifications.*, 
            JSON_BUILD_OBJECT(
                'id', users.id,
                'name', users.name,
                'email', users.email,
                'picture', users.picture,
                'note', users.note,
                'follow', CASE WHEN follows."followId" IS NOT NULL THEN true ELSE false END
            ) AS "follower"
        FROM notifications
        LEFT JOIN users ON notifications."followerId" = users.id
        LEFT JOIN follows ON notifications."userId" = follows."userId" 
            AND notifications."followerId" = follows."followId"
        WHERE notifications."userId" = $1
        ORDER BY notifications."createdAt" DESC;`,
        values: [userId],
      };

      this.logger.debug(`Executing query: (getUserNotificationsQuery)`);
      const res = await this.db.query(getUserNotificationsQuery);
      this.logger.log('Get user notification (end)');
      return res.rows;
    } catch (error) {
      this.logger.error('Get user notification error', error);
      throw new InternalServerError('Get user notification error');
    }
  }

  public async getNotificationCount(userId: string): Promise<number> {
    try {
      this.logger.log('Get notification count (start)');

      const getNotificationCountQuery = {
        text: `
        SELECT COUNT(*) FROM "notifications"
        WHERE "userId" = $1 AND "isWatched" = 'false'`,
        values: [userId],
      };

      this.logger.debug(`Executing query: (getNotificationCountQuery)`);
      const res = await this.db.query(getNotificationCountQuery);

      this.logger.log('Get notification count (end)');
      return Number(res.rows[0].count);
    } catch (error) {
      this.logger.error('Get notification count error', error);
      throw new InternalServerError('Get notification count error');
    }
  }
}
