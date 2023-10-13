import { Inject, Injectable, Logger } from '@nestjs/common';
import { InternalServerError } from 'src/shared/errors';
import { SeriesSeasonRateInput } from 'src/shared/dto';
import e from 'express';

@Injectable()
export class UserSeasonsService {
  constructor(@Inject('PG_CONNECTION') private db) {}
  private readonly logger = new Logger(UserSeasonsService.name);

  public async addUserSeasons(
    userId: string,
    seriesId: string,
    seasons: SeriesSeasonRateInput[],
  ): Promise<void> {
    this.logger.log('Add user seasons (start)');
    try {
      const filteredSeasons = seasons.filter((season) => season.rate);
      if (filteredSeasons.length !== 0) {
        const insertValues = filteredSeasons
          ? filteredSeasons
              .map(
                (season, index) =>
                  `('${seriesId}' ,$${index * 3 + 1}, $${index * 3 + 2}, $${
                    index * 3 + 3
                  })`,
              )
              .join(', ')
          : [];
        const valuesArray: any[] = [];
        filteredSeasons.forEach((season) => {
          valuesArray.push(userId, season.id, season.rate);
        });

        const addUserSeasonsQuery = {
          text: `
      INSERT INTO "userSeasons" 
      ("seriesId", "userId", "seasonId", "rate")
      VALUES ${insertValues}`,
          values: valuesArray,
        };

        this.logger.debug(`Executing query: (addUserSeasonsQuery)`);
        await this.db.query(addUserSeasonsQuery);
      }
    } catch (err) {
      this.logger.error('Add user seasons error', err);
      throw new InternalServerError('Add user seasons error');
    }
    this.logger.log('Add user seasons (end)');
  }

  public async deleteUserSeasons(
    userId: string,
    seriesId: string,
  ): Promise<void> {
    this.logger.log('Add user seasons (start)');
    try {
      const deleteUserSeasonsQuery = {
        text: `
          DELETE FROM "userSeasons" 
          WHERE "seriesId" = $1 AND "userId" = $2`,
        values: [seriesId, userId],
      };

      this.logger.debug(`Executing query: (deleteUserSeasonsQuery)`);
      await this.db.query(deleteUserSeasonsQuery);
    } catch (err) {
      this.logger.error('Add user seasons error', err);
      throw new InternalServerError('Add user seasons error');
    }
    this.logger.log('Add user seasons (end)');
  }

  private async getUserSeasonsCount(
    userId: string,
    seriesId: string,
  ): Promise<string[]> {
    this.logger.log('Get user seasons count (start)');
    try {
      const getSeasonsIdCount = {
        text: `
          SELECT ARRAY(SELECT "seasonId" FROM "userSeasons" 
          WHERE "seriesId" = $1 AND "userId" = $2) AS "seasonIds"`,
        values: [seriesId, userId],
      };

      this.logger.debug(`Executing query: (getSeasonsIdCount)`);
      const res = await this.db.query(getSeasonsIdCount);
      this.logger.log('Get user seasons count (end)');
      return res.rows[0].seasonIds;
    } catch (err) {
      this.logger.error('Get  user seasons count error', err);
      throw new InternalServerError('Get  user seasons count error');
    }
  }

  public async updateUserSeasons(
    userId: string,
    seriesId: string,
    seasons: SeriesSeasonRateInput[],
  ): Promise<void> {
    this.logger.log('Update user seasons (start)');
    const filteredSeasons = seasons.filter((season) => season.rate);

    const userSeasons = await this.getUserSeasonsCount(userId, seriesId);

    const updateSeasons: SeriesSeasonRateInput[] = [];
    const insertSeasons: SeriesSeasonRateInput[] = [];

    filteredSeasons.forEach((season) => {
      if (userSeasons.includes(season.id)) {
        updateSeasons.push(season);
      } else {
        insertSeasons.push(season);
      }
    });

    if (!!insertSeasons.length) {
      await this.addUserSeasons(userId, seriesId, insertSeasons);
    }

    if (!!updateSeasons.length) {
      try {
        const updateValues = updateSeasons
          .map(
            (season) =>
              `('${season.id}', '${userId}', '${seriesId}', ${season.rate})`,
          )
          .join(', ');

        const updateUserSeasonsQuery = {
          text: `
          UPDATE "userSeasons"
          SET rate = s.rate
          FROM (
            VALUES 
            ${updateValues}
          ) AS s("seasonId", "userId", "seriesId", rate)
          WHERE "userSeasons"."userId" = s."userId"::uuid
            AND "userSeasons"."seriesId" = s."seriesId"::uuid
            AND "userSeasons"."seasonId" = s."seasonId"::uuid;`,
        };
        console.log(updateUserSeasonsQuery.text);
        this.logger.debug('Executing query: (updateUserSeasons)');
        await this.db.query(updateUserSeasonsQuery);
      } catch (err) {
        this.logger.error('Update user seasons error', err);
        throw new InternalServerError('Update user seasons error');
      }
    }

    this.logger.log('Update user seasons (end)');
    this.logger.log('Update user seasons (end)');
  }
}
