import { Inject, Injectable, Logger } from '@nestjs/common';
import { InternalServerError } from 'src/shared/errors';
import { AcceptModerMediaInput } from '../dto';
import { SeriesModerResponse } from 'src/shared/dto';

@Injectable()
export class SeriesSeasonsService {
  constructor(@Inject('PG_CONNECTION') private db) {}
  private readonly logger = new Logger(SeriesSeasonsService.name);

  public async addSeriesSeasons(
    mediaId: string,
    seasons: SeriesModerResponse['seasons'],
  ): Promise<void> {
    this.logger.log('Add series seasons (start)');
    try {
      const insertValues = seasons
        ? seasons
            .map(
              (season, index) =>
                `($${index * 5 + 1}, $${index * 5 + 2}, $${index * 5 + 3}, $${
                  index * 5 + 4
                }, $${index * 5 + 5})`,
            )
            .join(', ')
        : [];
      const valuesArray: any[] = [];
      seasons.forEach((season) => {
        valuesArray.push(
          season.id,
          mediaId,
          season.season,
          season.title,
          season.episodes,
        );
      });
      console.log(valuesArray);
      if (valuesArray.length !== 0) {
        const addSeriesSeasonsQuery = {
          text: `
        INSERT INTO "seriesSeasons" 
        ("id","seriesId", "season", "title", "episodes")
        VALUES ${insertValues}
        RETURNING *`,
          values: valuesArray,
        };

        this.logger.debug(`Executing query: (addSeriesSeasonsQuery)`);
        const res = await this.db.query(addSeriesSeasonsQuery);
        console.log(res.rows);
      }
    } catch (err) {
      this.logger.error('Add series seasons error', err);
      throw new InternalServerError('Add series seasons error');
    }
    this.logger.log('Add series seasons (end)');
  }

  public async getSeriesSeasons(
    mediaId: string,
  ): Promise<SeriesModerResponse['seasons']> {
    this.logger.log('Add series seasons (start)');
    if (!mediaId) return [];
    try {
      const getSeriesSeasonsQuery = {
        text: `
        SELECT * FROM "seriesSeasons"
        WHERE "seriesId" = $1
         `,
        values: [mediaId],
      };

      this.logger.debug(`Executing query: (getSeriesSeasonsQuery)`);
      const res = await this.db.query(getSeriesSeasonsQuery);
      const seasons = res.rows.sort((a, b) => a.season - b.season);
      this.logger.log('Add series seasons (end)');
      return seasons;
    } catch (err) {
      this.logger.error('Add series seasons error', err);
      throw new InternalServerError('Add series seasons error');
    }
  }

  public async updateSeriesSeasons(
    mediaId: string,
    seasons: AcceptModerMediaInput['media']['seasons'],
  ): Promise<void> {
    this.logger.log('Add series seasons (start)');
    try {
      const updateValues = [];
      seasons.forEach((season) => {
        updateValues.push(
          season.season,
          season.title,
          season.episodes,
          season.id,
          mediaId,
        );
      });

      if (updateValues.length > 0) {
        const updateSeasonsQuery = {
          text: `
            UPDATE "seriesSeasons" AS ss
            SET "season" = u.season::smallint, "title" = u.title, "episodes" = u.episodes::smallint
            FROM (VALUES ${seasons
              .map(
                (_, index) =>
                  `($${index * 5 + 1}, $${index * 5 + 2}, $${index * 5 + 3}, $${
                    index * 5 + 4
                  }, $${index * 5 + 5})`,
              )
              .join(', ')}) AS u(season, title, episodes, id, "seriesId")
            WHERE ss."id"::text = u.id AND ss."seriesId"::text = u."seriesId"
          `,
          values: updateValues,
        };

        this.logger.debug(`Executing query: (updateSeasonsQuery)`);
        await this.db.query(updateSeasonsQuery);
      }
    } catch (err) {
      this.logger.error('Add series seasons error', err);
      throw new InternalServerError('Add series seasons error');
    }
    this.logger.log('Add series seasons (end)');
  }
}
