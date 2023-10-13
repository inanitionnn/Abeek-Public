import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  SubtractTokenInput,
  SubtractTokenResponse,
  CreateUserInput,
  GetUserInfoResponse,
  AddRoleUserInput,
} from './dto';
import { BadRequestError, InternalServerError } from 'src/shared/errors';
import {
  MediaEnum,
  NotificationEnum,
  RolesEnum,
  WarningEnum,
  WarningObjectEnum,
} from 'src/shared/enums';
import { MediaTokens, SuccessResponse, User } from 'src/shared/dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { UpdateUserInput } from './dto/updateUser.input';
import { WarningInput } from './dto/warning.input';
import { UserMediaService } from 'src/user-media/user-media.service';
import { FilesService } from 'src/files/files.service';
import { ForbiddenError } from '@nestjs/apollo';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject('PG_CONNECTION') private db,
    private notificationsService: NotificationsService,
    private userMediaService: UserMediaService,
    @Inject(forwardRef(() => FilesService))
    private filesService: FilesService,
  ) {}

  private readonly logger = new Logger(UsersService.name);

  private hashPassword(text: string, saltRounds: number): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(text, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  }

  public async getUserByEmail(userEmail: string): Promise<User | null> {
    try {
      this.logger.log('Get user by email (start)');
      const getUserByEmailQuery = {
        text: 'SELECT * FROM "users" WHERE "email" = $1',
        values: [userEmail],
      };

      this.logger.debug(`Executing query: (getUserByEmailQuery)`);
      const res = await this.db.query(getUserByEmailQuery);
      const user: User | null = res.rows[0] || null;
      this.logger.log('Get user by email (end)');
      return user;
    } catch (err) {
      this.logger.error('Get user by email error', err);
      throw new InternalServerError('Get user by email error');
    }
  }

  public async getUserById(userId: string): Promise<User | null> {
    try {
      this.logger.log('Get user by id (start)');
      const getUserByIdQuery = {
        text: 'SELECT * FROM "users" WHERE "id" = $1',
        values: [userId],
      };

      this.logger.debug(`Executing query: (getUserByIdQuery)`);

      const res = await this.db.query(getUserByIdQuery);
      const user: User | null = res.rows[0] || null;
      this.logger.log('Get user by id (end)');
      return user;
    } catch (err) {
      this.logger.error('Get user by id error', err);
      throw new InternalServerError('Get user by id error');
    }
  }

  public async getAllUsers(): Promise<User[]> {
    try {
      this.logger.log('Get all users (start)');
      const selectAllUsersQuery = {
        text: `
        SELECT * FROM "users"
        ORDER BY "createdAt" ASC`,
      };

      this.logger.debug(`Executing query: (selectAllUsersQuery)`);

      const res = await this.db.query(selectAllUsersQuery);
      const user: User[] = res.rows;
      this.logger.log('Get all users (end)');
      return user;
    } catch (err) {
      this.logger.error('Get all users error', err);
      throw new InternalServerError('Get all users error');
    }
  }

  public async createUser(data: CreateUserInput): Promise<User> {
    const user = await this.getUserByEmail(data.email);
    this.logger.log('Create user (start)');
    if (user) {
      this.logger.warn('This Email is already in use');
      throw new BadRequestError('This Email is already in use');
    }
    const saltRounds = +process.env.SALT_ROUNDS;
    const hashedPassword = await this.hashPassword(data.password, saltRounds);
    try {
      const createUserQuery = {
        text: 'INSERT INTO "users" (role, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [
          RolesEnum.User,
          data.name.substring(0, 55),
          data.email.substring(0, 255),
          hashedPassword,
        ],
      };
      this.logger.debug(`Executing query: (createUserQuery)`);

      const res = await this.db.query(createUserQuery);
      const user = res.rows[0];
      this.logger.log('Create user (end)');
      return user;
    } catch (error) {
      this.logger.error('Create user error', error);
      throw new InternalServerError('Create user error');
    }
  }

  public async addRoleToUser(
    curUser: User,
    dto: AddRoleUserInput,
  ): Promise<User> {
    this.logger.log('Add role to user (start)');
    const { role, userEmail } = dto;

    if (role === RolesEnum.Admin) {
      this.logger.warn('Add role to user error');
      throw new ForbiddenError(
        'You do not have access to grant the Admin role',
      );
    }

    const user = await this.getUserByEmail(userEmail);
    if (!user) {
      this.logger.warn('Add role to user error');
      throw new NotFoundError('User not found');
    }

    if (curUser.id === user.id) {
      this.logger.warn('Add role to user error');
      throw new BadRequestError('You can`t give role to yourself');
    }
    try {
      const addRoleQuery = {
        text: 'UPDATE "users" SET role = $1 WHERE id = $2 RETURNING *',
        values: [role, user.id],
      };

      this.logger.debug(`Executing query: (addRoleQuery)`);
      const res = await this.db.query(addRoleQuery);
      await this.notificationsService.addNotification({
        type: NotificationEnum.newRole,
        userId: user.id,
        notification: `Your new role: ${
          role === RolesEnum.Moder
            ? 'Moderator'
            : role === RolesEnum.User
            ? 'User'
            : 'Undefind'
        }`,
      });
      const newUser = res.rows[0];
      this.logger.log('Add role to user (end)');
      return newUser;
    } catch (error) {
      this.logger.error('Add role to user error', error);
      throw new InternalServerError('Add role to user error');
    }
  }

  public async saveActivationLink(
    userId: string,
    activationLink: string,
  ): Promise<User> {
    try {
      this.logger.log('Save activation link user (start)');
      const saveLinkQuery = {
        text: `
        UPDATE "users"
        SET "activationLink" = $1
        WHERE id = $2
        RETURNING *;
      `,
        values: [activationLink, userId],
      };
      this.logger.debug(`Executing query: (saveLinkQuery)`);
      const res = await this.db.query(saveLinkQuery);
      const user = res.rows[0];
      this.logger.log('Save link user (end)');
      return user;
    } catch (error) {
      this.logger.error('Save activation link user error', error);
      throw new InternalServerError('Save activation link to user error');
    }
  }

  public async saveResetPasswordLink(
    userId: string,
    resetLink: string,
  ): Promise<User> {
    try {
      this.logger.log('Save reset link user (start)');
      const saveLinkQuery = {
        text: `
        UPDATE "users"
        SET "resetPasswordLink" = $1
        WHERE id = $2
        RETURNING *;
      `,
        values: [resetLink, userId],
      };
      this.logger.debug(`Executing query: (saveLinkQuery)`);
      const res = await this.db.query(saveLinkQuery);
      const user = res.rows[0];
      this.logger.log('Save reset link user (end)');
      return user;
    } catch (error) {
      this.logger.error('Save reset link user error', error);
      throw new InternalServerError('Save reset password link to user error');
    }
  }

  public async activateUser(activationLink: string): Promise<User> {
    try {
      this.logger.log('Activate user (start)');
      const activateQuery = {
        text: `
        UPDATE "users"
        SET "isActivated" = true, "activationLink" = null
        WHERE "activationLink" = $1
        RETURNING *
      `,
        values: [activationLink],
      };
      this.logger.debug(`Executing query: (activateQuery)`);
      const res = await this.db.query(activateQuery);
      const user = res.rows[0];
      this.logger.log('Activate user (end)');
      return user;
    } catch (error) {
      this.logger.error('Activate user error', error);
      throw new InternalServerError('Activate user error');
    }
  }

  public async resetPassword(
    resetLink: string,
    newPassword: string,
  ): Promise<User> {
    this.logger.log('Reset user password (start)');
    const saltRounds = +process.env.SALT_ROUNDS;
    const hashedPassword = await this.hashPassword(newPassword, saltRounds);
    let user: User;
    try {
      const resetQuery = {
        text: `
        UPDATE "users"
        SET "password" = $1, "resetPasswordLink" = null
        WHERE "resetPasswordLink" = $2
        RETURNING *
      `,
        values: [hashedPassword, resetLink],
      };
      this.logger.debug(`Executing query: (resetQuery)`);
      const res = await this.db.query(resetQuery);
      user = res.rows[0];
    } catch (error) {
      this.logger.error('Reset user password error', error);
      throw new InternalServerError('Reset user password error');
    }

    this.logger.log('Reset user password (end)');
    return user;
  }

  public async banUser(userId: string, banReason: string): Promise<User> {
    this.logger.log('Ban user (start)');
    const user = await this.getUserById(userId);
    if (user.role === RolesEnum.Admin || user.role === RolesEnum.Moder) {
      this.logger.warn('Ban user error');
      throw new ForbiddenError('You can`t ban moder or admin');
    }
    try {
      const banQuery = {
        text: `
          UPDATE users
          SET "isBanned" = true, "banReason" = $2
          WHERE id = $1
          RETURNING *
        `,
        values: [userId, banReason],
      };
      this.logger.debug(`Executing query: (banQuery)`);
      const res = await this.db.query(banQuery);
      const user = res.rows[0];
      await this.notificationsService.addNotification({
        type: NotificationEnum.ban,
        userId: userId,
        notification:
          (banReason ?? `The reason for the ban: ${banReason}`) +
          'If you do not contact us via email regarding the unblocking of your account, it will be deleted in one month.',
      });
      this.logger.log('Ban user (end)');
      return user;
    } catch (error) {
      this.logger.error('Ban user error', error);
      throw new InternalServerError('Ban user error');
    }
  }

  public async banReportsUser(userId: string): Promise<User> {
    try {
      this.logger.log('Ban reports user (start)');
      const banQuery = {
        text: `
          UPDATE users
          SET "canSendReport" = false
          WHERE id = $1
          RETURNING *
        `,
        values: [userId],
      };
      this.logger.debug(`Executing query: (banQuery)`);
      const res = await this.db.query(banQuery);
      const user = res.rows[0];
      await this.notificationsService.addNotification({
        type: NotificationEnum.ban,
        userId: userId,
        notification: 'Your ability to send reports has been blocked.',
      });
      this.logger.log('Ban reports user (end)');
      return user;
    } catch (error) {
      this.logger.error('Ban reports user error', error);
      throw new InternalServerError('Ban reports user error');
    }
  }

  public async unbanUser(userEmail: string): Promise<User> {
    try {
      this.logger.log('Unban user (start)');
      const unBanQuery = {
        text: `
          UPDATE users
          SET "isBanned" = false, "banReason" = NULL
          WHERE email = $1
          RETURNING *
        `,
        values: [userEmail],
      };
      this.logger.debug(`Executing query: (unBanQuery)`);
      const res = await this.db.query(unBanQuery);
      this.logger.log('Unbanning user (end)');

      const user = res.rows[0];
      if (!user) {
        this.logger.warn('Unban user error');
        throw new NotFoundError('Not found user');
      }
      return user;
    } catch (error) {
      this.logger.error('Unban user error', error);
      throw new InternalServerError('Unban user error');
    }
  }

  public async getTokens(userId: string): Promise<MediaTokens> {
    try {
      this.logger.log('Get tokens (start)');

      const getTokensQuery = {
        text: `
        SELECT "mediaTokens", "additionalMediaTokens" FROM "users"
        WHERE id = $1`,
        values: [userId],
      };

      this.logger.debug(`Executing query: (getTokensQuery)`);
      const getTokensResult = await this.db.query(getTokensQuery);
      const res = getTokensResult.rows[0];

      this.logger.log('Get tokens (end)');
      return res;
    } catch (error) {
      this.logger.error('SGet tokens error', error);
      throw new InternalServerError('Get tokens error');
    }
  }

  public async addDailyTokens(): Promise<void> {
    try {
      this.logger.log('Add daily tokens (start)');

      const addDailyTokensQuery = {
        text: `
        UPDATE users
        SET mediaTokens = LEAST(mediaTokens + 15, 100)
        WHERE mediaTokens < 100;`,
      };

      this.logger.debug(`Executing query: (addDailyTokensQuery)`);
      await this.db.query(addDailyTokensQuery);
      this.logger.log('Add daily tokens (end)');
    } catch (error) {
      this.logger.error('Add daily tokens error', error);
      throw new InternalServerError('Add daily tokens error');
    }
  }

  public async subtractToken(
    dto: SubtractTokenInput,
  ): Promise<SubtractTokenResponse> {
    try {
      this.logger.log('Subtract token (start)');
      const { tokenCost, userId } = dto;

      const user = await this.getUserById(userId);

      if (user.role === RolesEnum.Admin || user.role === RolesEnum.Moder) {
        return {
          access: true,
          additionalMediaTokens: 200,
          mediaTokens: 300,
        };
      }
      const { mediaTokens, additionalMediaTokens } = await this.getTokens(
        userId,
      );

      const totalTokens = mediaTokens + additionalMediaTokens;
      if (totalTokens < tokenCost) {
        return {
          access: false,
          additionalMediaTokens: additionalMediaTokens,
          mediaTokens: mediaTokens,
        };
      }

      let newMediaTokens: number = mediaTokens;
      if (mediaTokens >= tokenCost) {
        newMediaTokens = mediaTokens - tokenCost;
      }

      let newAdditionalMediaTokens: number = additionalMediaTokens;
      if (mediaTokens < tokenCost) {
        newMediaTokens = 0;
        newAdditionalMediaTokens = totalTokens - tokenCost;
      }

      const updateTokensQuery = {
        text: `
        UPDATE "users" 
        SET "mediaTokens" = $1, "additionalMediaTokens" = $2
        WHERE id = $3
        RETURNING "mediaTokens", "additionalMediaTokens"
        `,
        values: [newMediaTokens, newAdditionalMediaTokens, userId],
      };

      this.logger.debug(`Executing query: (updateTokensQuery)`);
      const res = await this.db.query(updateTokensQuery);

      const tokens = res.rows[0];
      this.logger.log('Subtract token (end)');
      return {
        access: true,
        additionalMediaTokens: tokens.additionalMediaTokens,
        mediaTokens: tokens.mediaTokens,
      };
    } catch (error) {
      this.logger.error('Subtract token error', error);
      throw new InternalServerError('Subtract token error');
    }
  }

  public async updatePicture(userId: string, path: string): Promise<void> {
    try {
      this.logger.log('Update picture (start)');

      const updatePictureQuery = {
        text: `
        UPDATE users 
        SET picture = $2
        WHERE id = $1`,
        values: [userId, path],
      };

      this.logger.debug(`Executing query: (updatePictureQuery)`);
      await this.db.query(updatePictureQuery);
      this.logger.log('Update picture (end)');
    } catch (error) {
      this.logger.error('Update picture error', error);
      throw new InternalServerError('Update picture error');
    }
  }

  public async updateUser(
    userId: string,
    dto: UpdateUserInput,
  ): Promise<SuccessResponse> {
    try {
      this.logger.log('Update user (start)');
      const { name, note } = dto;
      if (!name && !note) return { success: true };
      const updateUserQuery = {
        text: `
        UPDATE users 
        SET  
            ${!!name ? `"name" ='${name}'` : ''}
            ${!!name && !!note ? ',' : ''}
            ${!!note ? `"note" ='${note}'` : ''}
        WHERE id = $1`,
        values: [userId],
      };

      this.logger.debug(`Executing query: (updateUserQuery)`);
      await this.db.query(updateUserQuery);

      this.logger.log('Update user (end)');
      return { success: true };
    } catch (error) {
      this.logger.error('Update user error', error);
      throw new InternalServerError('Update user error');
    }
  }

  public async getUserInfo(userId: string): Promise<GetUserInfoResponse> {
    try {
      this.logger.log('Get user info (start)');
      const getUserInfoQuery = {
        text: `
        SELECT
            u.id AS id,
            u.name AS name,
            u.picture as picture,
            u.note AS note,
            COUNT(DISTINCT f1."followId") AS "followingCount",
            COUNT(DISTINCT f2."userId") AS "followerCount",
            COUNT(DISTINCT um."mediaId")::smallint as "mediaCount"
        FROM
            users u
        LEFT JOIN
            "userMedia" um ON u.id = um."userId"
        LEFT JOIN
            "follows" f1 ON u.id = f1."userId" 
        LEFT JOIN
            "follows" f2 ON u.id = f2."followId" 
        WHERE
            u.id = $1
        GROUP BY
            u.id, u.name, u.picture;
        `,
        values: [userId],
      };

      this.logger.debug(`Executing query: (getUserInfoQuery)`);
      const res = await this.db.query(getUserInfoQuery);
      this.logger.log('Get user info (end)');
      return res.rows[0];
    } catch (error) {
      this.logger.error('Get user info error', error);
      throw new InternalServerError('Get user info error');
    }
  }

  // switch case deffault check
  private exhaustiveCheck(param: never) {
    this.logger.warn(`Unprocessed value ${param}`);
  }

  private getWarningText(
    warning: WarningEnum,
    warningObject: WarningObjectEnum,
    userId: string,
    mediaId: string,
    mediaType: MediaEnum,
    description: string,
  ): { notificationText: string; warningText: string } {
    let warningString = '';
    let warningObjectString = '';
    switch (warning) {
      case WarningEnum.copyright: {
        warningString = 'Violations: ' + 'copyright.';
        break;
      }
      case WarningEnum.pornography: {
        warningString = 'Violations: ' + 'pornography.';
        break;
      }
      case WarningEnum.spam: {
        warningString = 'Violations: ' + 'spam.';
        break;
      }
      case WarningEnum.violence: {
        warningString = 'Violations: ' + 'violence.';
        break;
      }
      default: {
        this.exhaustiveCheck(warning);
      }
    }
    switch (warningObject) {
      case WarningObjectEnum.accountImage: {
        warningObjectString =
          'We have removed your account image due to a violation of our terms of service.';
        break;
      }
      case WarningObjectEnum.accountName: {
        warningObjectString =
          'We have removed your account name due to a violation of our terms of service.';
        break;
      }
      case WarningObjectEnum.accountNote: {
        warningObjectString =
          'We have removed your account about note due to a violation of our terms of service.';
        break;
      }
      case WarningObjectEnum.media: {
        warningObjectString = `We have changed your media due to a violation of our terms of service.\nLink: https://${process.env.CLIENT_URL}/${mediaType}/${mediaId}/user/${userId}.`;
        break;
      }
      case WarningObjectEnum.report: {
        warningObjectString = `We have delete all your reports due to a violation of our terms of service.`;
        break;
      }
      case WarningObjectEnum.mediaNote: {
        warningObjectString = `We have removed your media note due to a violation of our terms of service.\nLink: https://${process.env.CLIENT_URL}/${mediaType}/${mediaId}/user/${userId}.`;
        break;
      }
      default: {
        this.exhaustiveCheck(warningObject);
      }
    }
    const endString = `Please do not use anything that violates the rules. Otherwise, your account will be banned`;
    const notificationText =
      warningObjectString +
      `\n` +
      warningString +
      ' ' +
      (description ?? '') +
      `\n` +
      endString;
    const warningText =
      `Object: ${warningObject}.` +
      `\n` +
      warningString +
      ' ' +
      (description ?? '');
    return { warningText, notificationText };
  }

  private async addUserWarning(userId: string, warning: string): Promise<User> {
    try {
      this.logger.log('Add user warning (start)');
      const unBanQuery = {
        text: `
        UPDATE users
        SET warnings = array_append(warnings, $2)
        WHERE id = $1
        RETURNING *
        `,
        values: [userId, warning],
      };
      this.logger.debug(`Executing query: (unBanQuery)`);
      const res = await this.db.query(unBanQuery);
      this.logger.log('Add user warning (end)');
      const user = res.rows[0];
      return user;
    } catch (error) {
      this.logger.error('Add user warning error', error);
      throw new InternalServerError('Add user warning error');
    }
  }

  public async acceptWarning(dto: WarningInput): Promise<SuccessResponse> {
    this.logger.log('Add warning (start)');
    const { userId, mediaId, description, warning, warningObject } = dto;

    const user = await this.getUserById(userId);

    const userMedia = mediaId
      ? await this.userMediaService.getUserMedia(userId, mediaId)
      : null;

    const { notificationText, warningText } = this.getWarningText(
      warning,
      warningObject,
      userId,
      mediaId,
      userMedia.mediaType,
      description,
    );

    switch (warningObject) {
      case WarningObjectEnum.accountImage: {
        if (user.picture) {
          this.filesService.deleteImage(user.picture);
        } else {
          this.logger.warn('Add warning error');
          throw new BadRequestError('User don`t have avatar image');
        }
        break;
      }
      case WarningObjectEnum.accountName: {
        if (user.name) {
          await this.updateUser(userId, { name: 'Deleted', note: null });
        } else {
          this.logger.warn('Add warning error');
          throw new BadRequestError('User don`t have name');
        }
        break;
      }
      case WarningObjectEnum.accountNote: {
        if (user.note) {
          await this.updateUser(userId, { name: null, note: 'Deleted' });
        } else {
          this.logger.warn('Add warning error');
          throw new BadRequestError('User don`t have about note');
        }
        break;
      }
      case WarningObjectEnum.mediaNote: {
        if (user.note) {
          await this.userMediaService.updateUserMedia(userId, {
            mediaId: mediaId,
            note: 'Deleted',
          });
        } else {
          this.logger.warn('Add warning error');
          throw new BadRequestError('User don`t have media note');
        }
        break;
      }
    }
    await this.notificationsService.addNotification({
      type: NotificationEnum.warning,
      userId: userId,
      notification: notificationText,
    });
    await this.addUserWarning(userId, warningText);

    return { success: true };
  }

  public async deleteNotActivatedAccounts(): Promise<string[]> {
    try {
      this.logger.log('Delete not activated accounts (start)');
      const unBanQuery = {
        text: `
        DELETE FROM users
        WHERE
        "isActivated" = false
        AND "createdAt" <= NOW() - INTERVAL '1 week'
        RETURNING *
        `,
      };
      this.logger.debug(`Executing query: (unBanQuery)`);
      const res = await this.db.query(unBanQuery);
      this.logger.log('Delete not activated accounts (end)');
      const deletedUsers: User[] = res.rows ?? [];
      const emails = deletedUsers.map((user) => user.email);
      return emails;
    } catch (error) {
      this.logger.error('Delete not activated accounts error', error);
      throw new InternalServerError('Delete not activated accounts error');
    }
  }

  public async deleteBannedAccounts(): Promise<string[]> {
    try {
      this.logger.log('Delete banned accounts (start)');
      const unBanQuery = {
        text: `
        DELETE FROM users
        WHERE
        "isBanned" = true
        AND "createdAt" <= NOW() - INTERVAL '3 month'
        RETURNING *
        `,
      };
      this.logger.debug(`Executing query: (unBanQuery)`);
      const res = await this.db.query(unBanQuery);
      this.logger.log('Delete banned accounts (end)');
      const deletedUsers: User[] = res.rows ?? [];
      const emails = deletedUsers.map((user) => user.email);
      return emails;
    } catch (error) {
      this.logger.error('Delete banned accounts error', error);
      throw new InternalServerError('Delete banned accounts error');
    }
  }
}
