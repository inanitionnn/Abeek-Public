import { Inject, Injectable, Logger } from '@nestjs/common';
import { InternalServerError } from 'src/shared/errors';
import {
  AcceptModerMediaInput,
  CreateMediaInput,
  GetRandomMediaInput,
  GetUserMediaInput,
  MediaFollowResponse,
  MediaModerResponse,
  MediaReportResponse,
} from '../dto';
import { FilmEnum, MediaEnum, SortedEnum, WatchedEnum } from 'src/shared/enums';
import {
  FilmBaseResponse,
  FilmMediaResponse,
  FilmSearchResponse,
  FilmsStatsResponse,
} from 'src/shared/dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('PG_CONNECTION') private db,
    private usersService: UsersService,
  ) {}
  private readonly logger = new Logger(FilmsService.name);

  public async addFilm(
    userId: string,
    mediaId: string,
    imageLink: string,
    dto: CreateMediaInput,
  ): Promise<void> {
    this.logger.log(`Add film (start)`);
    const { media } = dto;
    try {
      const addFilmQuery = {
        text: `
        INSERT INTO "films" 
        ("id","type", "title", "year", "country", "plot", "directedBy", "starring", "language", 
        "runTime", "boxOffice", "budget", "genres", "tags","image", "creatorId", "report", "createdType")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`,
        values: [
          mediaId,
          media.filmType,
          media.title ? media.title.substring(0, 255) : '',
          media.year,
          media.country ? media.country.substring(0, 55) : '',
          media.plot ? media.plot.substring(0, 1020) : '',
          media.directedBy
            ? media.directedBy.map((director) => director.substring(0, 55))
            : [],
          media.starring
            ? media.starring.map((star) => star.substring(0, 55))
            : [],
          media.language ? media.language.substring(0, 55) : '',
          media.runTime,
          media.boxOffice ? media.boxOffice.substring(0, 55) : '',
          media.budget ? media.budget.substring(0, 55) : '',
          media.genres
            ? media.genres.map((genre) => genre.substring(0, 55))
            : [],
          media.tags ? media.tags.map((tag) => tag.substring(0, 55)) : [],
          imageLink,
          userId,
          dto.report ? dto.report.substring(0, 1020) : '',
          dto.createdType,
        ],
      };
      this.logger.debug(`Executing query: (addFilmQuery)`);
      await this.db.query(addFilmQuery);
    } catch (err) {
      this.logger.error('Add film error', err);
      throw new InternalServerError('Creating film error');
    }
    this.logger.log(`Add film (end)`);
  }

  public async searchFilms(
    userId: string,
    query: string,
  ): Promise<FilmSearchResponse[]> {
    try {
      this.logger.log('Search films (start)');
      const searchFilmQuery = {
        text: `
        SELECT 
            '${MediaEnum.film}' as "media",
            f.type as "filmType",
            f.id, f.title, f.year, f.country, f.plot, f."directedBy",
            f.starring, f.language, f."runTime", f."boxOffice", f.budget,
            f.genres, f.tags, f.image, f."isPublic",
            CASE WHEN um."mediaId" IS NOT NULL THEN TRUE ELSE FALSE END AS "inUserMedia"
        FROM 
            "films" f
        LEFT JOIN 
            "userMedia" um 
        ON 
            f.id = um."mediaId" AND um."mediaType" = '${MediaEnum.film}' AND um."userId" = $2
        WHERE 
            (f."isPublic" = true OR um."userId" = $2) 
            AND to_tsvector('english', "title") @@ to_tsquery('english', $1)`,
        values: [query, userId],
      };
      this.logger.debug(`Executing query: (searchFilmQuery)`);
      const res = await this.db.query(searchFilmQuery);
      this.logger.log('Search films (end)');
      return res.rows;
    } catch (err) {
      this.logger.error('Search films error', err);
      throw new InternalServerError('Search films error');
    }
  }

  public async getFilm(
    userId: string,
    mediaId: string,
    followId: string,
  ): Promise<FilmMediaResponse> {
    this.logger.log('Get film (start)');
    try {
      if (!!userId && !!followId) {
        const getFilmQuery = {
          text: `
          SELECT
              '${MediaEnum.film}' as "media",
              f.type as "filmType",
              f.id, f.title, f.year, f.country, f.plot, f."directedBy",
              f.starring, f.language, f."runTime", f."boxOffice", f.budget,
              f.genres, f.tags, f.image, f."isPublic",
              um2."rate", um2."watched", um2."note",
              CASE WHEN um1."mediaId" IS NOT NULL THEN TRUE ELSE FALSE END AS "inUserMedia"
          FROM
              "films" f
          LEFT JOIN
              "userMedia" um1 ON f.id = um1."mediaId"
              AND um1."mediaType" = '${MediaEnum.film}'
              AND um1."userId" = $2
          LEFT JOIN
              "userMedia" um2 ON f.id = um2."mediaId"
              AND um2."mediaType" = '${MediaEnum.film}'
              AND um2."userId" = $3
          WHERE
              f.id = $1`,
          values: [mediaId, userId, followId],
        };
        this.logger.debug(`Executing query: (getFilmQuery)`);
        const res = await this.db.query(getFilmQuery);
        this.logger.log('Get film (end)');
        return res.rows[0];
      } else if (!!followId) {
        const getFilmQuery = {
          text: `
          SELECT
              '${MediaEnum.film}' as "media",
              f.type as "filmType",
              f.id, f.title, f.year, f.country, f.plot, f."directedBy",
              f.starring, f.language, f."runTime", f."boxOffice", f.budget,
              f.genres, f.tags, f.image, f."isPublic",
              um2."rate", um2."watched", um2."note"
          FROM
              "films" f
          LEFT JOIN
              "userMedia" um2 ON f.id = um2."mediaId"
              AND um2."mediaType" = '${MediaEnum.film}'
              AND um2."userId" = $2
          WHERE
              f.id = $1`,
          values: [mediaId, followId],
        };
        this.logger.debug(`Executing query: (getFilmQuery)`);
        console.log(followId);
        const res = await this.db.query(getFilmQuery);
        this.logger.log('Get film (end)');
        return { ...res.rows[0], inUserMedia: false };
      } else if (!!userId) {
        const getFilmQuery = {
          text: `
          SELECT
              '${MediaEnum.film}' as "media",
              f.type as "filmType",
              f.id, f.title, f.year, f.country, f.plot, f."directedBy",
              f.starring, f.language, f."runTime", f."boxOffice", f.budget,
              f.genres, f.tags, f.image, f."isPublic", um."rate", um."watched", um."note",
              CASE WHEN um."mediaId" IS NOT NULL THEN TRUE ELSE FALSE END AS "inUserMedia"
          FROM
              "films" f
          LEFT JOIN
              "userMedia" um ON f.id = um."mediaId"
              AND um."mediaType" = '${MediaEnum.film}'
              AND um."userId" = $2
          WHERE
              f.id = $1`,
          values: [mediaId, userId],
        };
        this.logger.debug(`Executing query: (getFilmQuery)`);
        const res = await this.db.query(getFilmQuery);
        this.logger.log('Get film (end)');
        return res.rows[0];
      } else {
        throw new Error();
      }
    } catch (err) {
      this.logger.error('Get film error', err);
      throw new InternalServerError('Get film error');
    }
  }

  public async getCollectionFilms(
    dto: GetUserMediaInput,
  ): Promise<FilmMediaResponse[]> {
    try {
      this.logger.log('Get collection films (start)');
      const { count, filmType, page, sorted, userId, watched } = dto;
      const offset = count * page;

      const getUserFilmsQuery = {
        text: `
        SELECT
            '${MediaEnum.film}' as "media",
            f.type as "filmType",
            f.id, f.title, f.year, f.country, f.plot, f."directedBy",
            f.starring, f.language, f."runTime", f."boxOffice", f.budget,
            f.genres, f.tags, f.image, f."isPublic", um."rate", um."watched", um."note"
        FROM
            "films" f
        LEFT JOIN
            "userMedia" um
        ON
            um."mediaId" = f.id AND um."mediaType" = '${MediaEnum.film}'
        WHERE  um."userId" = $1
        ${filmType ? `AND f."type" = '${filmType}'` : ''}
        ${
          watched === WatchedEnum.abandoned
            ? `AND um.watched = '${WatchedEnum.abandoned}'`
            : watched === WatchedEnum.completed
            ? `AND um.watched = '${WatchedEnum.completed}'`
            : watched === WatchedEnum.paused
            ? `AND um.watched = '${WatchedEnum.paused}'`
            : watched === WatchedEnum.planned
            ? `AND um.watched = '${WatchedEnum.planned}'`
            : watched === WatchedEnum.viewing
            ? `AND um.watched = '${WatchedEnum.viewing}'`
            : watched === WatchedEnum.reviewing
            ? `AND um.watched = '${WatchedEnum.reviewing}'`
            : watched === WatchedEnum.rated
            ? `AND um.rate IS NOT NULL`
            : ''
        }
        ${watched === WatchedEnum.rated ? `AND um.rate IS NOT NULL` : ''}
        ${
          sorted === SortedEnum.dateAsc
            ? 'ORDER BY um."updatedAt" ASC'
            : sorted === SortedEnum.dateDesc
            ? 'ORDER BY um."updatedAt" DESC'
            : sorted === SortedEnum.rateAsc
            ? 'ORDER BY COALESCE(um.rate, 0) ASC'
            : sorted === SortedEnum.rateDesc
            ? 'ORDER BY COALESCE(um.rate, 0) DESC'
            : sorted === SortedEnum.titleAsc
            ? 'ORDER BY f.title ASC'
            : sorted === SortedEnum.titleDesc
            ? 'ORDER BY f.title DESC'
            : sorted === SortedEnum.yearAsc
            ? 'ORDER BY f.year ASC'
            : sorted === SortedEnum.yearDesc
            ? 'ORDER BY f.year DESC'
            : ''
        }
        LIMIT $2 OFFSET $3
        `,
        values: [userId, count, offset],
      };
      this.logger.debug(`Executing query: (getUserFilmsQuery)`);
      const res = await this.db.query(getUserFilmsQuery);
      this.logger.log(`Get collection films (end)`);
      return res.rows;
    } catch (err) {
      this.logger.error('Get collection films error', err);
      throw new InternalServerError('Get collection films error');
    }
  }

  public async getRandomFilms(
    userId: string,
    dto: GetRandomMediaInput,
  ): Promise<FilmBaseResponse[]> {
    this.logger.log('Get random films (start)');
    const { count, filmType, InUserMedia, fromYear, genres, toYear } = dto;
    let res;
    try {
      if (InUserMedia) {
        const getRandomFilmQuery = {
          text: `
          SELECT
              '${MediaEnum.film}' as "media",
              f.type as "filmType",
              f.id, f.title, f.year, f.country, f.plot, f."directedBy",
              f.starring, f.language, f."runTime", f."boxOffice", f.budget,
              f.genres, f.tags, f.image, f."isPublic"
          FROM
              "films" f
          LEFT JOIN
              "userMedia" um
          ON
              um."mediaId" = f.id AND um."mediaType" = '${MediaEnum.film}'
          WHERE  um."userId" = $1
          ${filmType ? `AND f."type" = '${filmType}'` : ''}
          ${
            fromYear && toYear
              ? `AND f."year" BETWEEN ${fromYear} AND ${toYear}`
              : fromYear
              ? `AND f."year" >= ${fromYear}`
              : toYear
              ? `AND f."year" <= ${toYear}`
              : ''
          }
          ${
            genres && genres.length !== 0
              ? `AND (ARRAY['${genres.join(`', '`)}']::varchar[] <@ f.genres
            OR ARRAY['${genres.join(`', '`)}']::varchar[] && f.genres)`
              : ''
          }
          ORDER BY RANDOM()
            LIMIT $2`,
          values: [userId, count],
        };
        this.logger.debug(`Executing query: (getRandomFilmQuery)`);
        res = await this.db.query(getRandomFilmQuery);
      } else {
        const getRandomPublicFilmQuery = {
          text: `
            SELECT f."id",'${
              MediaEnum.film
            }' as "media", f."type" as "filmType", f."title", f."year", f."country", 
            f."plot", f."directedBy", f."starring", f."language", f."runTime",
             f."boxOffice", f."budget", f."genres", f."tags", f."image", "isPublic"
            FROM "films" f
            LEFT JOIN "userMedia" um 
                ON f."id" = um."mediaId" 
                AND UM."mediaType" = '${MediaEnum.film}'
                AND um."userId" = $1 
                AND um."watched" <> '${WatchedEnum.planned}'
            WHERE um."mediaId" IS NULL
            ${filmType ? ` AND f."type" = '${filmType}'` : ''}
            ${
              fromYear && toYear
                ? `AND f."year" BETWEEN ${fromYear} AND ${toYear}`
                : fromYear
                ? `AND f."year" >= ${fromYear}`
                : toYear
                ? `AND f."year" <= ${toYear}`
                : ''
            } 
            ${
              genres && genres.length !== 0
                ? `AND (ARRAY['${genres.join(`', '`)}']::varchar[] <@ f.genres
              OR ARRAY['${genres.join(`', '`)}']::varchar[] && f.genres)`
                : ''
            }
            ORDER BY RANDOM()
            LIMIT $2
            `,
          values: [userId, count],
        };

        this.logger.debug(`Executing query: (getRandomPublicFilmQuery)`);
        res = await this.db.query(getRandomPublicFilmQuery);
      }
    } catch (err) {
      this.logger.error('Get random films error', err);
      throw new InternalServerError('Get random films error');
    }
    this.logger.log(`Get random films (end)`);
    return res.rows;
  }

  public async getModerFilms(): Promise<MediaModerResponse> {
    this.logger.log('Get moder films (start)');
    try {
      const getPrivateFilmQuery = {
        text: `
        SELECT *,
          TYPE AS "filmType",
          '${MediaEnum.film}' AS "media"
        FROM "films"
        WHERE "isChecked" = false
        ORDER BY "createdAt" ASC
        LIMIT 1
         `,
      };

      this.logger.debug(`Executing query: (getPrivateFilmQuery)`);
      const mediaRes = await this.db.query(getPrivateFilmQuery);
      const media = mediaRes.rows[0];
      const query = media.title
        .replace(/[^a-zA-Z0-9]/g, '')
        .trim()
        .split(' ')
        .join(' & ');
      const getFilmsByTitleQuery = {
        text: `
        SELECT *, '${MediaEnum.film}' as media FROM "films"
        WHERE "isPublic" = 'true'
            AND to_tsvector('english', "title") @@ to_tsquery('english', $1)
         `,
        values: [query],
      };

      this.logger.debug(`Executing query: (getFilmsByTitleQuery)`);
      const searchRes = await this.db.query(getFilmsByTitleQuery);

      const creator = await this.usersService.getUserById(media.creatorId);

      this.logger.log(`Get moder films (end)`);
      return {
        media: media,
        createdType: media.createdType,
        report: media.report,
        searchMedia: searchRes.rows,
        creator: creator,
      };
    } catch (err) {
      this.logger.error('Get moder films error', err);
      throw new InternalServerError('Get moder films error');
    }
  }

  public async getReportFilm(): Promise<MediaReportResponse> {
    this.logger.log('Get report film (start)');
    try {
      const getReportFilmQuery = {
        text: `
        SELECT jsonb_build_object(
            'media', r."mediaType",
            'filmType', f."type",
            'id', f.id,
            'title', f.title,
            'year', f.year,
            'country', f.country,
            'plot', f.plot,
            'directedBy', f."directedBy",
            'starring', f.starring,
            'language', f.language,
            'runTime', f."runTime",
            'boxOffice', f."boxOffice",
            'budget', f.budget,
            'genres', f.genres,
            'tags', f.tags,
            'image', f.image,
            'isPublic', f."isPublic"
        ) as "media",
        r."report",
        r."id" as "reportId",
        f."createdType",
        r."informerId",
        f."creatorId"
        FROM "reports" r
        LEFT JOIN "films" f ON r."mediaId" = f.id
        WHERE "mediaType" = '${MediaEnum.film}'
        ORDER BY r."createdAt" ASC
        LIMIT 1;
         `,
      };

      this.logger.debug(`Executing query: (getReportFilmQuery)`);
      const res = await this.db.query(getReportFilmQuery);
      const report = res.rows[0];

      const creator = await this.usersService.getUserById(report.creatorId);
      const informer = await this.usersService.getUserById(report.informerId);

      this.logger.log(`Get report film (end)`);
      return { ...report, creator: creator, informer: informer };
    } catch (err) {
      this.logger.error('Get report film error', err);
      throw new InternalServerError('Get report film error');
    }
  }

  public async updateFilm(
    moderId: string,
    imageLink: string,
    embedding: number[],
    dto: AcceptModerMediaInput,
  ): Promise<void> {
    this.logger.log(`Update film (start)`);
    const { isPublic, media, mediaId, isChecked } = dto;
    try {
      const updateFilmQuery = {
        text: `
        UPDATE "films" 
        SET 
          "type" = $2,
          "title" = $3,
          "year" = $4,
          "country" = $5,
          "plot" = $6,
          "directedBy" = $7,
          "starring" = $8,
          "language" = $9,
          "runTime" = $10,
          "boxOffice" = $11,
          "budget" = $12,
          "genres" = $13,
          "tags" = $14,
          "image" = $15,
         
          ${
            isPublic
              ? `"isPublic" = 'true',
            "embedding" = '[${embedding.join(', ')}]',`
              : ''
          }
          ${!!isChecked ? `"isChecked" = 'true',` : ''}
          "moderId" = $16
        WHERE "id" = $1;`,
        values: [
          mediaId,
          media.filmType,
          media.title ? media.title.substring(0, 255) : '',
          media.year,
          media.country ? media.country.substring(0, 55) : '',
          media.plot ? media.plot.substring(0, 1020) : '',
          media.directedBy
            ? media.directedBy.map((director) => director.substring(0, 55))
            : [],
          media.starring
            ? media.starring.map((star) => star.substring(0, 55))
            : [],
          media.language ? media.language.substring(0, 55) : '',
          media.runTime,
          media.boxOffice ? media.boxOffice.substring(0, 55) : '',
          media.budget ? media.budget.substring(0, 55) : '',
          media.genres
            ? media.genres.map((genre) => genre.substring(0, 55))
            : [],
          media.tags ? media.tags.map((tag) => tag.substring(0, 55)) : [],
          imageLink,
          moderId,
        ],
      };
      this.logger.debug(`Executing query: (updateFilmQuery)`);
      await this.db.query(updateFilmQuery);
    } catch (err) {
      this.logger.error('Update film error', err);
      throw new InternalServerError('Update film error');
    }
    this.logger.log(`Update film (end)`);
  }

  public async embeddingSearchFilms(
    userId: string,
    count: number,
    embedding: number[],
  ): Promise<FilmSearchResponse[]> {
    this.logger.log('Embedding search films (start)');
    try {
      const embeddingSearchFilmQuery = {
        text: `
        SELECT 
            '${MediaEnum.film}' as "media",
            f.type as "filmType",
            f.id, f.title, f.year, f.country, f.plot, f."directedBy",
            f.starring, f.language, f."runTime", f."boxOffice", f.budget,
            f.genres, f.tags, f.image, f."isPublic",
            CASE WHEN um."mediaId" IS NOT NULL THEN TRUE ELSE FALSE END AS "inUserMedia"
        FROM 
            "films" f
        LEFT JOIN 
            "userMedia" um 
        ON 
            f.id = um."mediaId" 
            AND um."mediaType" = '${MediaEnum.film}' 
            AND um."userId" = $2
        WHERE 
            f."isPublic" = true
        ORDER BY embedding <-> '[${embedding.join(', ')}]'
        LIMIT $1;
        `,
        values: [count, userId],
      };
      this.logger.debug(`Executing query: (embeddingSearchFilmQuery)`);
      const res = await this.db.query(embeddingSearchFilmQuery);
      this.logger.log('Embedding search films (end)');
      return res.rows;
    } catch (err) {
      this.logger.error('Embedding search films error', err);
      throw new InternalServerError('Embedding search films error');
    }
  }

  public async getEditFilm(mediaId: string): Promise<FilmBaseResponse> {
    this.logger.log('Get edit film (start)');
    try {
      const getEditFilmQuery = {
        text: `
        SELECT *,
          TYPE AS "filmType",
          '${MediaEnum.film}' AS "media"
        FROM "films"
        WHERE "id" = $1`,
        values: [mediaId],
      };

      this.logger.debug(`Executing query: (getEditFilmQuery)`);
      const res = await this.db.query(getEditFilmQuery);
      this.logger.log(`Get edit film (end)`);
      return res.rows[0];
    } catch (err) {
      this.logger.error('Get edit film error', err);
      throw new InternalServerError('Get edit film error');
    }
  }

  public async getNearFilms(
    userId: string,
    mediaId: string,
    count: number,
  ): Promise<FilmSearchResponse[]> {
    this.logger.log('Get near films (start)');
    try {
      const embeddingSearchFilmQuery = {
        text: `
        SELECT 
            '${MediaEnum.film}' as "media",
            f.type as "filmType",
            f.id, f.title, f.year, f.country, f.plot, f."directedBy",
            f.starring, f.language, f."runTime", f."boxOffice", f.budget,
            f.genres, f.tags, f.image, f."isPublic",
            CASE WHEN um."mediaId" IS NOT NULL THEN TRUE ELSE FALSE END AS "inUserMedia"
        FROM 
            "films" f
        LEFT JOIN 
            "userMedia" um 
        ON 
            f.id = um."mediaId" 
            AND um."mediaType" = '${MediaEnum.film}' 
            AND um."userId" = $2
        WHERE 
            f."isPublic" = true AND f.id != $3
        ORDER BY embedding <-> (SELECT embedding FROM "films"
            WHERE id = $3)
        LIMIT $1;
        `,
        values: [count, userId, mediaId],
      };
      this.logger.debug(`Executing query: (embeddingSearchFilmQuery)`);
      const res = await this.db.query(embeddingSearchFilmQuery);
      this.logger.log(`Get near films (end)`);
      return res.rows;
    } catch (err) {
      this.logger.error('Get near films error', err);
      throw new InternalServerError('Get near films error');
    }
  }

  public async getFollowFilms(
    userId: string,
    limit: number,
    offset: number,
  ): Promise<MediaFollowResponse[]> {
    this.logger.log('Get follow films (start)');
    try {
      const getFollowFilmsQuery = {
        text: `
        WITH "followsMedia" AS (
          SELECT
              U.id as "idUser",
              U.name,
              U.picture,
              UM.*
          FROM
              FOLLOWS AS FL
          JOIN
              "userMedia" AS UM ON FL."followId" = UM."userId"
              AND UM."mediaType" = $4
          JOIN
              "users" AS U ON FL."followId" = U."id"
          WHERE
              FL."userId" = $1
          ORDER BY
              UM."updatedAt" DESC
          LIMIT $2
          OFFSET $3
        )
        SELECT
            JSON_BUILD_OBJECT(
                'id', FM."idUser",
                'name', FM.name,
                'picture', FM.picture
            ) AS "user",
            JSON_BUILD_OBJECT(
                'id', FM."id",
                'userId', FM."userId",
                'mediaType', FM."mediaType",
                'mediaId', FM."mediaId",
                'watched', FM."watched",
                'rate', FM."rate",
                'note', FM."note",
                'changed', FM."changed",
                'updatedAt', FM."updatedAt"
            ) AS "userMedia",
            JSON_BUILD_OBJECT(
                'media', $4,
                'filmType', F."type",
                'id', F."id",
                'isPublic', F."isPublic",
                'title', F."title",
                'year', F."year",
                'country', F."country",
                'plot', F."plot",
                'directedBy', F."directedBy",
                'starring', F."starring",
                'language', F."language",
                'runTime', F."runTime",
                'boxOffice', F."boxOffice",
                'budget', F."budget",
                'genres', F."genres",
                'tags', F."tags",
                'image', F."image"
            ) AS "media"
        FROM
            "followsMedia" FM
        JOIN
            FILMS AS F ON FM."mediaId" = F.id;`,
        values: [userId, limit, offset, MediaEnum.film],
      };
      this.logger.debug(`Executing query: (getFollowFilmsQuery)`);
      const res = await this.db.query(getFollowFilmsQuery);
      this.logger.log('Get follow films (end)');
      return res.rows;
    } catch (err) {
      this.logger.error('Get follow films error', err);
      throw new InternalServerError('Get follow films error');
    }
  }

  public async deleteUserFilm(mediaId: string): Promise<void> {
    this.logger.log('Delete user film (start)');
    try {
      const deleteUserFilmQuery = {
        text: `
        DO $$ 
        DECLARE
        media_count integer;
        BEGIN
            SELECT COUNT(*) INTO media_count
            FROM "userMedia"
            WHERE "mediaType" = '${MediaEnum.film}' AND "mediaId" = '${mediaId}';

            IF media_count = 0 THEN
                DELETE FROM films WHERE id = '${mediaId}' AND NOT "isPublic";
            END IF;
        END $$;
        `,
      };
      this.logger.debug(`Executing query: (deleteUserFilmQuery)`);
      await this.db.query(deleteUserFilmQuery);
      this.logger.log('Delete user film (end)');
    } catch (err) {
      this.logger.error('Delete user film error', err);
      throw new InternalServerError('Delete user film error');
    }
  }

  public async getFilmsStats(userId: string): Promise<FilmsStatsResponse> {
    try {
      this.logger.log('Get films stats (start)');
      const getFilmsStatsQuery = {
        text: `
        SELECT 
            JSON_BUILD_OBJECT(
                'all', JSON_BUILD_OBJECT(
                    'allCount', SUM(CASE WHEN um."mediaType" = $2 THEN 1 ELSE 0 END),
                    'completedCount', SUM(CASE WHEN um."mediaType" = $2 AND um.watched = '${WatchedEnum.completed}' THEN 1 ELSE 0 END),
                    'plannedCount', SUM(CASE WHEN um."mediaType" = $2 AND um.watched = '${WatchedEnum.planned}' THEN 1 ELSE 0 END),
                    'pausedCount', SUM(CASE WHEN um."mediaType" = $2 AND um.watched = '${WatchedEnum.paused}' THEN 1 ELSE 0 END),
                    'abandonedCount', SUM(CASE WHEN um."mediaType" = $2 AND um.watched = '${WatchedEnum.abandoned}' THEN 1 ELSE 0 END),
                    'reviewingCount', SUM(CASE WHEN um."mediaType" = $2 AND um.watched = '${WatchedEnum.reviewing}' THEN 1 ELSE 0 END),
                    'viewingCount', SUM(CASE WHEN um."mediaType" = $2 AND um.watched = '${WatchedEnum.viewing}' THEN 1 ELSE 0 END),
                    'averageRating',  
                    CASE 
                        WHEN COUNT(CASE WHEN um."mediaType" = $2 AND um.rate IS NOT NULL THEN 1 ELSE NULL END) = 0 THEN 0
                        ELSE ROUND(AVG(CASE WHEN um."mediaType" = $2 THEN um.rate ELSE NULL END), 2)
                    END
                ),
                'animated',  
                JSON_BUILD_OBJECT(
                    'allCount', SUM(CASE WHEN um."mediaType" = $2 AND f."type" = $3 THEN 1 ELSE 0 END),
                    'completedCount', SUM(CASE WHEN um."mediaType" = $2 AND f."type" = $3 AND um.watched = '${WatchedEnum.completed}' THEN 1 ELSE 0 END),
                    'plannedCount', SUM(CASE WHEN um."mediaType" = $2 AND f."type" = $3 AND um.watched = '${WatchedEnum.planned}' THEN 1 ELSE 0 END),
                    'pausedCount', SUM(CASE WHEN um."mediaType" = $2 AND f."type" = $3 AND um.watched = '${WatchedEnum.paused}' THEN 1 ELSE 0 END),
                    'abandonedCount', SUM(CASE WHEN um."mediaType" = $2 AND f."type" = $3 AND um.watched = '${WatchedEnum.abandoned}' THEN 1 ELSE 0 END),
                    'reviewingCount', SUM(CASE WHEN um."mediaType" = $2 AND f."type" = $3 AND um.watched = '${WatchedEnum.reviewing}' THEN 1 ELSE 0 END),
                    'viewingCount', SUM(CASE WHEN um."mediaType" = $2 AND f."type" = $3 AND um.watched = '${WatchedEnum.viewing}' THEN 1 ELSE 0 END),
                    'averageRating',  
                    CASE 
                        WHEN COUNT(CASE WHEN um."mediaType" = $2 AND f."type" = $3 AND um.rate IS NOT NULL THEN 1 ELSE NULL END) = 0 THEN 0
                        ELSE ROUND(AVG(CASE WHEN um."mediaType" = $2 AND f."type" = $3 THEN um.rate ELSE NULL END), 2)
                    END
                ),
                'anime',  
                JSON_BUILD_OBJECT(
                    'allCount', SUM(CASE WHEN um."mediaType" = $2 AND f."type" = $4 THEN 1 ELSE 0 END),
                    'completedCount', SUM(CASE WHEN um."mediaType" = $2 AND f."type" = $4 AND um.watched = '${WatchedEnum.completed}' THEN 1 ELSE 0 END),
                    'plannedCount', SUM(CASE WHEN um."mediaType" = $2 AND f."type" = $4 AND um.watched = '${WatchedEnum.planned}' THEN 1 ELSE 0 END),
                    'pausedCount', SUM(CASE WHEN um."mediaType" = $2 AND f."type" = $4 AND um.watched = '${WatchedEnum.paused}' THEN 1 ELSE 0 END),
                    'abandonedCount', SUM(CASE WHEN um."mediaType" = $2 AND f."type" = $4 AND um.watched = '${WatchedEnum.abandoned}' THEN 1 ELSE 0 END),
                    'reviewingCount', SUM(CASE WHEN um."mediaType" = $2 AND f."type" = $4 AND um.watched = '${WatchedEnum.reviewing}' THEN 1 ELSE 0 END),
                    'viewingCount', SUM(CASE WHEN um."mediaType" = $2 AND f."type" = $4 AND um.watched = '${WatchedEnum.viewing}' THEN 1 ELSE 0 END),
                    'averageRating',  
                    CASE 
                        WHEN COUNT(CASE WHEN um."mediaType" = $2 AND f."type" = $4 AND um.rate IS NOT NULL THEN 1 ELSE NULL END) = 0 THEN 0
                        ELSE ROUND(AVG(CASE WHEN um."mediaType" = $2 AND f."type" = $4 THEN um.rate ELSE NULL END), 2)
                    END
                ),
                'movie',  
                JSON_BUILD_OBJECT(
                    'allCount', SUM(CASE WHEN um."mediaType" = $2 AND f."type" = $5 THEN 1 ELSE 0 END),
                    'completedCount', SUM(CASE WHEN um."mediaType" = $2 AND f."type" = $5 AND um.watched = '${WatchedEnum.completed}' THEN 1 ELSE 0 END),
                    'plannedCount', SUM(CASE WHEN um."mediaType" = $2 AND f."type" = $5 AND um.watched = '${WatchedEnum.planned}' THEN 1 ELSE 0 END),
                    'pausedCount', SUM(CASE WHEN um."mediaType" = $2 AND f."type" = $5 AND um.watched = '${WatchedEnum.paused}' THEN 1 ELSE 0 END),
                    'abandonedCount', SUM(CASE WHEN um."mediaType" = $2 AND f."type" = $5 AND um.watched = '${WatchedEnum.abandoned}' THEN 1 ELSE 0 END),
                    'reviewingCount', SUM(CASE WHEN um."mediaType" = $2 AND f."type" = $5 AND um.watched = '${WatchedEnum.reviewing}' THEN 1 ELSE 0 END),
                    'viewingCount', SUM(CASE WHEN um."mediaType" = $2 AND f."type" = $5 AND um.watched = '${WatchedEnum.viewing}' THEN 1 ELSE 0 END),
                    'averageRating',  
                    CASE 
                        WHEN COUNT(CASE WHEN um."mediaType" = $2 AND f."type" = $5 AND um.rate IS NOT NULL THEN 1 ELSE NULL END) = 0 THEN 0
                        ELSE ROUND(AVG(CASE WHEN um."mediaType" = $2 AND f."type" = $5 THEN um.rate ELSE NULL END), 2)
                    END
                )
            ) as stats
        FROM  
            "userMedia" um
        LEFT JOIN
            "films" f ON um."mediaType" = $2 AND um."mediaId" = f."id"  
        WHERE
            um."userId" = $1;
        `,
        values: [
          userId,
          MediaEnum.film,
          FilmEnum.animated,
          FilmEnum.anime,
          FilmEnum.movie,
        ],
      };
      this.logger.debug(`Executing query: (getFilmsStatsQuery)`);
      const res = await this.db.query(getFilmsStatsQuery);
      this.logger.log('Get films stats (end)');
      return res.rows[0].stats;
    } catch (err) {
      this.logger.error('Get films stats error', err);
      throw new InternalServerError('Get films stats error');
    }
  }
}
