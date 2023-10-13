import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from 'src/shared/errors';
import { AddMediaInput, UpdateUserMediaInput } from './dto';
import { SuccessResponse, UserMediaResponse } from 'src/shared/dto';
import { ChangedEnum } from 'src/shared/enums';

@Injectable()
export class UserMediaService {
  constructor(@Inject('PG_CONNECTION') private db) {}

  private readonly logger = new Logger(UserMediaService.name);

  public async getUserMedia(
    userId: string,
    mediaId: string,
  ): Promise<UserMediaResponse | null> {
    this.logger.log('Get user media (start)');
    let res: UserMediaResponse;
    try {
      const deleteUserMediaQuery = {
        text: `
        SELECT * FROM "userMedia"
        WHERE "userId" = $1 AND "mediaId" = $2
       `,
        values: [userId, mediaId],
      };

      this.logger.debug(`Executing query: (deleteUserMediaQuery)`);
      const userMediares = await this.db.query(deleteUserMediaQuery);
      res = userMediares.rows[0] || null;
    } catch (err) {
      this.logger.error('Get user media (error)', err);
      throw new InternalServerError('Get user media error');
    }
    this.logger.log('Get user media (end)');
    return res;
  }

  public async deleteUserMedia(
    userId: string,
    mediaId: string,
  ): Promise<UserMediaResponse> {
    this.logger.log('Delete user media (start)');

    let res: UserMediaResponse;
    try {
      const deleteUserMediaQuery = {
        text: `
        DELETE FROM "userMedia"
        WHERE "userId" = $1 AND "mediaId" = $2
        RETURNING  *
       `,
        values: [userId, mediaId],
      };

      this.logger.debug(`Executing query: (deleteUserMediaQuery)`);
      const userMediares = await this.db.query(deleteUserMediaQuery);
      res = userMediares.rows[0];
    } catch (err) {
      this.logger.error('Delete user media (error)', err);
      throw new InternalServerError('Delete user media error');
    }

    if (res === undefined) {
      this.logger.warn('Media not found in user media (error)');
      throw new NotFoundError('Media not found in your collection error');
    }

    this.logger.log('Delete user media (end)');
    return res;
  }

  public async updateUserMedia(
    userId: string,
    dto: UpdateUserMediaInput,
  ): Promise<SuccessResponse> {
    this.logger.log('Update user media (start)');
    const { mediaId, note, rate, watched } = dto;
    this.logger.verbose(
      `note: (${note}). rate: (${rate}). watched: (${watched}).`,
    );
    this.logger.verbose(
      `note: (${!!note}). rate: (${!!rate}). watched: (${!!watched}).`,
    );
    try {
      const updateUserMediaQuery = {
        text: `
        UPDATE "userMedia"
        SET
           ${watched ? `watched = '${watched}',` : ''}
           ${rate ? `rate = ${rate},` : ''}
           ${note ? `note = '${note.substring(0, 1020)}',` : ''}
           ${
             note || watched || rate
               ? `changed =  ARRAY[${note ? `'${ChangedEnum.changeNote}'` : ''} 
                 ${note && rate ? ',' : ''}
                 ${rate ? `'${ChangedEnum.changeRate}'` : ''} 
                 ${watched && (note || rate) ? ',' : ''}
                  ${
                    watched ? `'${ChangedEnum.changeWatchType}'` : ''
                  }]::varchar[],`
               : ''
           }
            "updatedAt" = current_timestamp
        WHERE "userId" = $1
            AND "mediaId" = $2`,
        values: [userId, mediaId],
      };
      console.log(updateUserMediaQuery.text);
      this.logger.debug(`Executing query: (updateUserMediaQuery)`);
      await this.db.query(updateUserMediaQuery);
    } catch (err) {
      this.logger.error('Update user media (error)', err);
      throw new InternalServerError('Update user media error');
    }
    this.logger.log('Update user media (end)');
    return { success: true };
  }

  public async addMediaToUser(
    userId: string,
    dto: AddMediaInput,
  ): Promise<SuccessResponse> {
    this.logger.log('Add media to user (start)');
    const { mediaId, mediaType, note, rate, watched } = dto;

    const oldUserMedia = await this.getUserMedia(userId, mediaId);
    if (oldUserMedia) {
      this.logger.warn('Add media to user error');
      throw new BadRequestError(
        `You already have this ${mediaType} in your collection`,
      );
    }

    const change: ChangedEnum[] = [
      ChangedEnum.AddToCollection,
      ChangedEnum.changeWatchType,
    ];
    if (rate) change.push(ChangedEnum.changeRate);
    if (note) change.push(ChangedEnum.changeNote);
    try {
      const addMediaToUserQuery = {
        text: `
        INSERT INTO "userMedia" ("userId", "mediaType", "mediaId", "watched", "rate", "note", "changed")
        VALUES ($1, $2, $3, $4, $5, $6, $7);`,
        values: [
          userId,
          mediaType,
          mediaId,
          watched,
          rate,
          note ? dto.note.substring(0, 1020) : '',
          change,
        ],
      };

      this.logger.debug(`Executing query: (addMediaToUserQuery)`);
      await this.db.query(addMediaToUserQuery);
    } catch (err) {
      this.logger.error('Add media to user (error)', err);
      throw new InternalServerError('Add media to user error');
    }
    this.logger.log('Add media to user (end)');
    return { success: true };
  }
}
