import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  AcceptModerMediaInput,
  CreateMediaInput,
  GetRandomMediaInput,
  GetUserMediaInput,
  MediaFollowResponse,
  MediaModerResponse,
  MediaReportResponse,
} from '../dto';
import { InternalServerError } from 'src/shared/errors';
import {
  MediaEnum,
  SeriesEnum,
  SortedEnum,
  WatchedEnum,
} from 'src/shared/enums';
import {
  SeriesBaseResponse,
  SeriesMediaResponse,
  SeriesModerResponse,
  SeriesSearchResponse,
  SeriesStatsResponse,
} from 'src/shared/dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SeriesService {
  constructor(
    @Inject('PG_CONNECTION') private db,
    private usersService: UsersService,
  ) {}
  private readonly logger = new Logger(SeriesService.name);

  public async addSeries(
    userId: string,
    mediaId: string,
    imageLink: string,
    dto: CreateMediaInput,
  ): Promise<void> {
    this.logger.log(`Add series (start)`);
    const { media } = dto;

    try {
      const addSeriesQuery = {
        text: `
      INSERT INTO "series" 
      (id, type, title, "startYear", "endYear", country, plot, "directedBy", 
      language, genres, tags, image, "creatorId", report, "createdType")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);`,
        values: [
          mediaId,
          media.seriesType,
          media.title ? media.title.substring(0, 255) : '',
          media.startYear,
          media.endYear,
          media.country ? media.country.substring(0, 55) : '',
          media.plot ? media.plot.substring(0, 1020) : '',
          media.directedBy
            ? media.directedBy.map((director) => director.substring(0, 55))
            : [],
          media.language,
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
      this.logger.debug(`Executing query: (addSeriesQuery)`);
      await this.db.query(addSeriesQuery);
    } catch (err) {
      this.logger.error('Add series error', err);
      throw new InternalServerError('Add series error');
    }
    this.logger.log(`Add series (end)`);
  }

  public async searchSeries(
    userId: string,
    query: string,
  ): Promise<SeriesSearchResponse[]> {
    try {
      this.logger.log('Search series (start)');
      const searchSeriesQuery = {
        text: `
          SELECT 
              '${MediaEnum.series}' as "media",
              s.type as "seriesType",
              s.id, s.title, s."startYear", s."endYear", s.country, s.plot, 
              s."directedBy", s.language, s.genres, s.tags, s.image, s."isPublic",
              CASE WHEN um."mediaId" IS NOT NULL THEN TRUE ELSE FALSE END AS "inUserMedia"
          FROM 
              "series" s
          LEFT JOIN 
              "userMedia" um 
          ON 
              s.id = um."mediaId" AND um."mediaType" = '${MediaEnum.series}' AND um."userId" = $2
          WHERE 
              (s."isPublic" = true OR um."userId" = $2) 
              AND to_tsvector('english', "title") @@ to_tsquery('english', $1)`,
        values: [query, userId],
      };
      this.logger.debug(`Executing query: (searchSeriesQuery)`);
      const res = await this.db.query(searchSeriesQuery);
      this.logger.log('Search series (end)');
      return res.rows;
    } catch (err) {
      this.logger.error('Search series error', err);
      throw new InternalServerError('Search series error');
    }
  }

  public async getSeries(
    userId: string,
    mediaId: string,
    followId: string,
  ): Promise<SeriesMediaResponse> {
    this.logger.log('Get series (start)');
    try {
      if (!!userId && !!followId) {
        const getSeriesQuery = {
          text: `
          SELECT
          S."id",
          '${MediaEnum.series}' AS "media",
          S."type" AS "seriesType",
          S."title",
          S."startYear",
          S."endYear",
          S."country",
          S."plot",
          S."directedBy",
          S."language",
          S."genres",
          S."tags",
          S."image",
          S."isPublic",
          JSON_AGG(
              JSON_BUILD_OBJECT(
                  'id', SS.ID,
                  'season', SS.SEASON,
                  'title', SS.TITLE,
                  'episodes', SS.EPISODES,
                  'rate', US.RATE
              )
          ) AS SEASONS,
          CASE
              WHEN UM1."mediaId" IS NOT NULL THEN TRUE
              ELSE FALSE
          END AS "inUserMedia",
          MAX(UM2."rate") AS "rate",
          MAX(UM2."watched") AS "watched",
          MAX(UM2."note") AS "note"
      FROM
          SERIES AS S
      LEFT JOIN
          "seriesSeasons" AS SS ON S.ID = SS."seriesId"
      LEFT JOIN
          "userSeasons" AS US ON SS.ID = US."seasonId" AND US."userId" = $3
      LEFT JOIN
          "userMedia" AS UM1 ON S.ID = UM1."mediaId" AND UM1."mediaType" = '${MediaEnum.series}' AND UM1."userId" = $2
      LEFT JOIN
          "userMedia" AS UM2 ON S.ID = UM2."mediaId" AND UM2."mediaType" = '${MediaEnum.series}' AND UM2."userId" = $3
      WHERE
          S."id" = $1
      GROUP BY
          S."id",
          S."type",
          S."title",
          S."startYear",
          S."endYear",
          S."country",
          S."plot",
          S."directedBy",
          S."language",
          S."genres",
          S."tags",
          S."image",
          S."isPublic",
          UM1."mediaId",
          UM2."mediaId";`,
          values: [mediaId, userId, followId],
        };
        this.logger.debug(`Executing query: (getSeriesQuery)`);
        const res = await this.db.query(getSeriesQuery);
        this.logger.log('Get series (end)');
        return res.rows[0];
      } else if (!!followId) {
        const getSeriesQuery = {
          text: `
             SELECT
              S."id",
              '${MediaEnum.series}' AS "media",
              S."type" AS "seriesType",
              S."title",
              S."startYear",
              S."endYear",
              S."country",
              S."plot",
              S."directedBy",
              S."language",
              S."genres",
              S."tags",
              S."image",
              S."isPublic",
              JSON_AGG(
                  JSON_BUILD_OBJECT(
                      'id', SS.ID,
                      'season', SS.SEASON,
                      'title', SS.TITLE,
                      'episodes', SS.EPISODES,
                      'rate', US.RATE
                  )
              ) AS SEASONS,
              MAX(UM."rate") AS "rate",
              MAX(UM."watched") AS "watched",
              MAX(UM."note") AS "note"
          FROM
              SERIES AS S
          LEFT JOIN
              "seriesSeasons" AS SS ON S.ID = SS."seriesId"
          LEFT JOIN
              "userSeasons" AS US ON SS.ID = US."seasonId" AND US."userId" = $2
          LEFT JOIN
              "userMedia" AS UM ON S.ID = UM."mediaId" AND UM."mediaType" = '${MediaEnum.series}' AND UM."userId" = $2
          WHERE
              S."id" = $1
          GROUP BY
              S."id",
              S."type",
              S."title",
              S."startYear",
              S."endYear",
              S."country",
              S."plot",
              S."directedBy",
              S."language",
              S."genres",
              S."tags",
              S."image",
              S."isPublic",
              UM."mediaId";`,
          values: [mediaId, followId],
        };
        this.logger.debug(`Executing query: (getSeriesQuery)`);
        const res = await this.db.query(getSeriesQuery);
        this.logger.log('Get series (end)');
        return { ...res.rows[0], inUserMedia: false };
      } else if (!!userId) {
        const getSeriesQuery = {
          text: `
          SELECT
          S."id",
          '${MediaEnum.series}' AS "media",
          S."type" AS "seriesType",
          S."title",
          S."startYear",
          S."endYear",
          S."country",
          S."plot",
          S."directedBy",
          S."language",
          S."genres",
          S."tags",
          S."image",
          S."isPublic",
          JSON_AGG(
              JSON_BUILD_OBJECT(
                  'id', SS.ID,
                  'season', SS.SEASON,
                  'title', SS.TITLE,
                  'episodes', SS.EPISODES,
                  'rate', US.RATE
              )
          ) AS SEASONS,
          CASE
              WHEN UM."mediaId" IS NOT NULL THEN TRUE
              ELSE FALSE
          END AS "inUserMedia",
          MAX(UM."rate") AS "rate",
          MAX(UM."watched") AS "watched",
          MAX(UM."note") AS "note"
      FROM
          SERIES AS S
      LEFT JOIN
          "seriesSeasons" AS SS ON S.ID = SS."seriesId"
      LEFT JOIN
          "userSeasons" AS US ON SS.ID = US."seasonId" AND US."userId" = $2
      LEFT JOIN
          "userMedia" AS UM ON S.ID = UM."mediaId" AND UM."mediaType" = '${MediaEnum.series}' AND UM."userId" = $2
      WHERE
          S."id" = $1
      GROUP BY
          S."id",
          S."type",
          S."title",
          S."startYear",
          S."endYear",
          S."country",
          S."plot",
          S."directedBy",
          S."language",
          S."genres",
          S."tags",
          S."image",
          S."isPublic",
          UM."mediaId";
            `,
          values: [mediaId, userId],
        };
        this.logger.debug(`Executing query: (getSeriesQuery)`);
        const res = await this.db.query(getSeriesQuery);
        this.logger.log('Get series (end)');
        return res.rows[0];
      } else {
        throw new Error();
      }
    } catch (err) {
      this.logger.error('Get series error', err);
      throw new InternalServerError('Get series error');
    }
  }

  public async getCollectionSeries(
    dto: GetUserMediaInput,
  ): Promise<SeriesMediaResponse[]> {
    try {
      this.logger.log('Get collection series (start)');
      const { count, seriesType, page, sorted, userId, watched } = dto;
      const offset = count * page;

      const getUserSeriesQuery = {
        text: `
          SELECT
              '${MediaEnum.series}' as "media", 
              s."type" as "seriesType", 
              s."id", s."title", s."startYear", s."endYear", s."country", s."plot", s."directedBy", 
              s."language", s."genres", s."tags", s."image", s."isPublic", um."rate", um."watched", um."note"
          FROM
              "series" s
          LEFT JOIN
              "userMedia" um
          ON
              um."mediaId" = s.id AND um."mediaType" = '${MediaEnum.series}'
          WHERE  um."userId" = $1
          ${seriesType ? `AND s."type" = '${seriesType}'` : ''}
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
              ? 'ORDER BY s.title ASC'
              : sorted === SortedEnum.titleDesc
              ? 'ORDER BY s.title DESC'
              : sorted === SortedEnum.yearAsc
              ? 'ORDER BY s."startYear" ASC'
              : sorted === SortedEnum.yearDesc
              ? 'ORDER BY s."startYear" DESC'
              : ''
          }
          LIMIT $2 OFFSET $3
          `,
        values: [userId, count, offset],
      };
      this.logger.debug(`Executing query: (getUserSeriesQuery)`);
      const res = await this.db.query(getUserSeriesQuery);
      this.logger.log(`Get collection series (end)`);
      return res.rows;
    } catch (err) {
      this.logger.error('Get collection series error', err);
      throw new InternalServerError('Get collection series error');
    }
  }

  public async getRandomSeries(
    userId: string,
    dto: GetRandomMediaInput,
  ): Promise<SeriesBaseResponse[]> {
    this.logger.log('Get random series (start)');
    const { count, seriesType, InUserMedia, fromYear, genres, toYear } = dto;
    let res;
    try {
      if (InUserMedia) {
        const getRandomSeriesQuery = {
          text: `
          SELECT
              '${MediaEnum.series}' as "media", 
              s."type" as "seriesType", 
              s."id", s."title", s."startYear", s."endYear", s."country", s."plot", s."directedBy", 
              s."language", s."genres", s."tags", s."image", s."isPublic"
          FROM
              "series" s
          LEFT JOIN
              "userMedia" um
          ON
              um."mediaId" = s.id AND um."mediaType" = '${MediaEnum.series}'
          WHERE  um."userId" = $1
              ${
                fromYear && toYear
                  ? `AND s."startYear" BETWEEN ${fromYear} AND ${toYear}`
                  : fromYear
                  ? `AND s."startYear" >= ${fromYear}`
                  : toYear
                  ? `AND s."startYear" <= ${toYear}`
                  : ''
              }
              ${
                genres && genres.length !== 0
                  ? `AND (ARRAY['${genres.join(`', '`)}']::varchar[] <@ s.genres
                  OR ARRAY['${genres.join(`', '`)}']::varchar[] && s.genres)`
                  : ''
              }
          ORDER BY RANDOM()
          LIMIT $2`,
          values: [userId, count],
        };
        this.logger.debug(`Executing query: (getRandomSeriesQuery)`);
        res = await this.db.query(getRandomSeriesQuery);
      } else {
        const getRandomSeriesPublicQuery = {
          text: `
            SELECT  s."id", '${
              MediaEnum.series
            }' as "media", s."type" as "seriesType", s."title", 
            s."startYear", s."endYear", s."country", s."plot", s."directedBy", 
            s."language", s."genres", s."tags", s."image", s."isPublic"
            FROM "series" s
            LEFT JOIN "userMedia" um 
                ON s."id" = um."mediaId" 
                AND UM."mediaType" = '${MediaEnum.series}'
                AND um."userId" = $1 
                AND um."watched" <> '${WatchedEnum.planned}'
            WHERE um."mediaId" IS NULL
            ${seriesType ? `AND s."type" = '${seriesType}'` : ''}
            ${
              fromYear && toYear
                ? `AND s."startYear" BETWEEN ${fromYear} AND ${toYear}`
                : fromYear
                ? `AND s."startYear" >= ${fromYear}`
                : toYear
                ? `AND s."startYear" <= ${toYear}`
                : ''
            }
            ${
              genres && genres.length !== 0
                ? `AND (ARRAY['${genres.join(`', '`)}']::varchar[] <@ s.genres
              OR ARRAY['${genres.join(`', '`)}']::varchar[] && s.genres)`
                : ''
            }
            ORDER BY RANDOM()
            LIMIT $2
            `,
          values: [userId, count],
        };

        this.logger.debug(`Executing query: (getRandomSeriesPublicQuery)`);
        res = await this.db.query(getRandomSeriesPublicQuery);
      }
    } catch (err) {
      this.logger.error('Get random series error', err);
      throw new InternalServerError('Get random series error');
    }
    this.logger.log(`Get random series (end)`);
    return res.rows;
  }

  public async getModerSeries(): Promise<MediaModerResponse> {
    this.logger.log('Get moder series (start)');
    try {
      const getPrivateSeriesQuery = {
        text: `
        SELECT *,
          TYPE AS "seriesType",
          '${MediaEnum.series}' AS "media"
        FROM "series"
        WHERE "isChecked" = false
        ORDER BY "createdAt" ASC
        LIMIT 1
         `,
      };

      this.logger.debug(`Executing query: (getPrivateSeriesQuery)`);
      const mediaRes = await this.db.query(getPrivateSeriesQuery);
      const media = mediaRes.rows[0];

      const query = media.title
        .replace(/[^a-zA-Z0-9]/g, '')
        .trim()
        .split(' ')
        .join(' & ');

      const getSeriesByTitleQuery = {
        text: `
        SELECT *, '${MediaEnum.series}' as media FROM "series"
        WHERE "isPublic" = 'true'
            AND to_tsvector('english', "title") @@ to_tsquery('english', $1)
         `,
        values: [query],
      };

      this.logger.debug(`Executing query: (getSeriesByTitleQuery)`);
      const searchRes = await this.db.query(getSeriesByTitleQuery);

      const creator = await this.usersService.getUserById(media.creatorId);

      this.logger.log('Get moder series (end)');
      return {
        media: media,
        createdType: media.createdType,
        report: media.report,
        searchMedia: [...searchRes.rows],
        creator: creator,
      };
    } catch (err) {
      this.logger.error('Get moder series error', err);
      throw new InternalServerError('Get moder series error');
    }
  }

  public async getReportSeries(): Promise<MediaReportResponse> {
    this.logger.log('Get report series (start)');
    try {
      const getReportSeriesQuery = {
        text: `
        SELECT jsonb_build_object(
          'media', r."mediaType",
          'id', s."id",
          'seriesType', s."type",
          'title', s."title",
          'startYear', s."startYear",
          'endYear', s."endYear",
          'country', s."country",
          'plot', s."plot",
          'directedBy', s."directedBy",
          'language', s."language",
          'genres', s."genres",
          'tags', s."tags",
          'image', s."image",
          'isPublic', s."isPublic
      ) as "media",
        r."report",
        r."id" as "reportId",
        s."createdType",
        r."informerId",
        s."creatorId"
      FROM "reports" r
      LEFT JOIN "series" s ON r."mediaId" = s.id
      WHERE "mediaType" = '${MediaEnum.series}'
      ORDER BY r."createdAt" ASC
      LIMIT 1;
         `,
      };

      this.logger.debug(`Executing query: (getReportSeriesQuery)`);
      const res = await this.db.query(getReportSeriesQuery);
      const media = res.rows[0];

      const creator = await this.usersService.getUserById(media.creatorId);
      const informer = await this.usersService.getUserById(media.informerId);

      this.logger.log(`Get report series (end)`);
      return { ...media, creator: creator, informer: informer };
    } catch (err) {
      this.logger.error('Get report series error', err);
      throw new InternalServerError('Get report series error');
    }
  }

  public async updateSeries(
    moderId: string,
    imageLink: string,
    embedding: number[],
    dto: AcceptModerMediaInput,
  ): Promise<void> {
    this.logger.log(`Update series (start)`);
    const { isPublic, media, mediaId, isChecked } = dto;
    try {
      const updateSeriesQuery = {
        text: `
        UPDATE "series" 
        SET
          "type" = $2,
          "title" = $3,
          "startYear" = $4,
          "endYear" = $5,
          "country" = $6,
          "plot" = $7,
          "directedBy" = $8,
          "language" = $9,
          "genres" = $10,
          "tags" = $11,
          "image" = $12,
          ${
            isPublic
              ? `"isPublic" = 'true',
            "embedding" = '[${embedding.join(', ')}]',`
              : ''
          }
          ${!!isChecked ? `"isChecked" = 'true',` : ''}
          "moderId" = $13
       
        WHERE "id" = $1;`,
        values: [
          mediaId,
          media.seriesType,
          media.title ? media.title.substring(0, 255) : '',
          media.startYear,
          media.endYear,
          media.country ? media.country.substring(0, 55) : '',
          media.plot ? media.plot.substring(0, 1020) : '',
          media.directedBy
            ? media.directedBy.map((director) => director.substring(0, 55))
            : [],
          media.language,
          media.genres
            ? media.genres.map((genre) => genre.substring(0, 55))
            : [],
          media.tags ? media.tags.map((tag) => tag.substring(0, 55)) : [],
          imageLink,
          moderId,
        ],
      };
      this.logger.debug(`Executing query: (updateSeriesQuery)`);
      await this.db.query(updateSeriesQuery);
    } catch (err) {
      this.logger.error('Update series error', err);
      throw new InternalServerError('Update series error');
    }
    this.logger.log(`Update series (end)`);
  }

  public async embeddingSearchSeries(
    userId: string,
    count: number,
    embedding: number[],
  ): Promise<SeriesSearchResponse[]> {
    this.logger.log('Embedding search series (start)');
    try {
      const embeddingSearchSeriesQuery = {
        text: `
          SELECT 
              '${MediaEnum.series}' as "media",
              s.type as "seriesType",
              s.id, s.title, s."startYear", s."endYear", s.country, s.plot, 
              s."directedBy", s.language, s.genres, s.tags, s.image, s."isPublic",
              CASE WHEN um."mediaId" IS NOT NULL THEN TRUE ELSE FALSE END AS "inUserMedia"
          FROM 
              "series" s
          LEFT JOIN 
              "userMedia" um 
          ON 
              s.id = um."mediaId" 
              AND um."mediaType" = '${MediaEnum.series}' 
              AND um."userId" = $2
          WHERE 
              s."isPublic" = true
          ORDER BY embedding <-> '[${embedding.join(', ')}]'
          LIMIT $1;
          `,
        values: [count, userId],
      };
      this.logger.debug(`Executing query: (embeddingSearchSeriesQuery)`);
      const res = await this.db.query(embeddingSearchSeriesQuery);
      this.logger.log('Embedding search series (end)');
      return res.rows;
    } catch (err) {
      this.logger.error('Embedding search series error', err);
      throw new InternalServerError('Embedding search series error');
    }
  }

  public async getEditSeries(mediaId: string): Promise<SeriesModerResponse> {
    this.logger.log('Get edit series (start)');
    try {
      const getEditFilmQuery = {
        text: `
          SELECT *,
            TYPE AS "seriesType",
            '${MediaEnum.series}' AS "media"
          FROM "series"
          WHERE "id" = $1`,
        values: [mediaId],
      };

      this.logger.debug(`Executing query: (getEditFilmQuery)`);
      const res = await this.db.query(getEditFilmQuery);
      this.logger.log(`Get edit series (end)`);
      return res.rows[0];
    } catch (err) {
      this.logger.error('Get edit series error', err);
      throw new InternalServerError('Get edit series error');
    }
  }

  public async getNearSeries(
    userId: string,
    mediaId: string,
    count: number,
  ): Promise<SeriesSearchResponse[]> {
    this.logger.log('Get near series (start)');
    try {
      const embeddingSearchSeriesQuery = {
        text: `
          SELECT 
              '${MediaEnum.series}' as "media",
              s.type as "seriesType",
              s.id, s.title, s."startYear", s."endYear", s.country, s.plot, 
              s."directedBy", s.language, s.genres, s.tags, s.image, s."isPublic",
              CASE WHEN um."mediaId" IS NOT NULL THEN TRUE ELSE FALSE END AS "inUserMedia"
          FROM 
              "series" s
          LEFT JOIN 
              "userMedia" um 
          ON 
              s.id = um."mediaId" 
              AND um."mediaType" = '${MediaEnum.series}' 
              AND um."userId" = $2
          WHERE 
              s."isPublic" = true AND s.id != $3
          ORDER BY embedding <-> (SELECT embedding FROM "series"
              WHERE id = $3)
          LIMIT $1;
          `,
        values: [count, userId, mediaId],
      };
      this.logger.debug(`Executing query: (embeddingSearchSeriesQuery)`);
      const res = await this.db.query(embeddingSearchSeriesQuery);
      this.logger.log(`Get near series (end)`);
      return res.rows;
    } catch (err) {
      this.logger.error('Get near series error', err);
      throw new InternalServerError('Get near series error');
    }
  }

  public async getFollowSeries(
    userId: string,
    limit: number,
    offset: number,
  ): Promise<MediaFollowResponse[]> {
    this.logger.log('Get follow series (start)');
    try {
      const getFollowSeriesQuery = {
        text: `
        WITH "followsMedia" AS (
          SELECT
              U.id as "idUser",
              U.name,
              U.picture,
              UM.*
          FROM
              FOLLOWS AS FL
          LEFT JOIN
              "userMedia" AS UM ON FL."followId" = UM."userId"
              AND UM."mediaType" = $4
          LEFT JOIN
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
                'seriesType', S."type",
                'id', S."id",
                'isPublic', S."isPublic",
                'title', S."title",
                'startYear', S."startYear",
                'endYear', S."endYear",
                'country', S."country",
                'plot', S."plot",
                'directedBy', S."directedBy",
                'language', S."language",
                'genres', S."genres",
                'tags', S."tags",
                'image', S."image"
            ) AS "media"
        FROM
            "followsMedia" FM
        JOIN
            series AS S ON FM."mediaId" = S.id;`,
        values: [userId, limit, offset, MediaEnum.series],
      };
      this.logger.debug(`Executing query: (getFollowSeriesQuery)`);
      const res = await this.db.query(getFollowSeriesQuery);
      this.logger.log('Get follow series (end)');
      return res.rows;
    } catch (err) {
      this.logger.error('Get follow series error', err);
      throw new InternalServerError('Get follow series error');
    }
  }

  public async deleteUserSeries(mediaId: string): Promise<void> {
    this.logger.log('Delete user series (start)');

    try {
      const deleteUserSeriesQuery = {
        text: `
        DO $$ 
        DECLARE
        media_count integer;
        BEGIN
            SELECT COUNT(*) INTO media_count
            FROM "userMedia"
            WHERE "mediaType" = '${MediaEnum.series}' AND "mediaId" = '${mediaId}';

            IF media_count = 0 THEN
                DELETE FROM series WHERE id = '${mediaId}' AND NOT "isPublic";
            END IF;
        END $$;
        `,
      };
      this.logger.debug(`Executing query: (deleteUserSeriesQuery)`);
      await this.db.query(deleteUserSeriesQuery);
      this.logger.log('Delete user series (end)');
    } catch (err) {
      this.logger.error('Delete user series error', err);
      throw new InternalServerError('Delete user series error');
    }
  }

  public async getSeriesStats(userId: string): Promise<SeriesStatsResponse> {
    try {
      this.logger.log('Get series stats (start)');
      const getSeriesStatsQuery = {
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
                    'allCount', SUM(CASE WHEN um."mediaType" = $2 AND s."type" = $3 THEN 1 ELSE 0 END),
                    'completedCount', SUM(CASE WHEN um."mediaType" = $2 AND s."type" = $3 AND um.watched = '${WatchedEnum.completed}' THEN 1 ELSE 0 END),
                    'plannedCount', SUM(CASE WHEN um."mediaType" = $2 AND s."type" = $3 AND um.watched = '${WatchedEnum.planned}' THEN 1 ELSE 0 END),
                    'pausedCount', SUM(CASE WHEN um."mediaType" = $2 AND s."type" = $3 AND um.watched = '${WatchedEnum.paused}' THEN 1 ELSE 0 END),
                    'abandonedCount', SUM(CASE WHEN um."mediaType" = $2 AND s."type" = $3 AND um.watched = '${WatchedEnum.abandoned}' THEN 1 ELSE 0 END),
                    'reviewingCount', SUM(CASE WHEN um."mediaType" = $2 AND s."type" = $3 AND um.watched = '${WatchedEnum.reviewing}' THEN 1 ELSE 0 END),
                    'viewingCount', SUM(CASE WHEN um."mediaType" = $2 AND s."type" = $3 AND um.watched = '${WatchedEnum.viewing}' THEN 1 ELSE 0 END),
                    'averageRating',  
                    CASE 
                        WHEN COUNT(CASE WHEN um."mediaType" = $2 AND s."type" = $3 AND um.rate IS NOT NULL THEN 1 ELSE NULL END) = 0 THEN 0
                        ELSE ROUND(AVG(CASE WHEN um."mediaType" = $2 AND s."type" = $3 THEN um.rate ELSE NULL END), 2)
                    END
                ),
                'anime',  
                JSON_BUILD_OBJECT(
                    'allCount', SUM(CASE WHEN um."mediaType" = $2 AND s."type" = $4 THEN 1 ELSE 0 END),
                    'completedCount', SUM(CASE WHEN um."mediaType" = $2 AND s."type" = $4 AND um.watched = '${WatchedEnum.completed}' THEN 1 ELSE 0 END),
                    'plannedCount', SUM(CASE WHEN um."mediaType" = $2 AND s."type" = $4 AND um.watched = '${WatchedEnum.planned}' THEN 1 ELSE 0 END),
                    'pausedCount', SUM(CASE WHEN um."mediaType" = $2 AND s."type" = $4 AND um.watched = '${WatchedEnum.paused}' THEN 1 ELSE 0 END),
                    'abandonedCount', SUM(CASE WHEN um."mediaType" = $2 AND s."type" = $4 AND um.watched = '${WatchedEnum.abandoned}' THEN 1 ELSE 0 END),
                    'reviewingCount', SUM(CASE WHEN um."mediaType" = $2 AND s."type" = $4 AND um.watched = '${WatchedEnum.reviewing}' THEN 1 ELSE 0 END),
                    'viewingCount', SUM(CASE WHEN um."mediaType" = $2 AND s."type" = $4 AND um.watched = '${WatchedEnum.viewing}' THEN 1 ELSE 0 END),
                    'averageRating',  
                    CASE 
                        WHEN COUNT(CASE WHEN um."mediaType" = $2 AND s."type" = $4 AND um.rate IS NOT NULL THEN 1 ELSE NULL END) = 0 THEN 0
                        ELSE ROUND(AVG(CASE WHEN um."mediaType" = $2 AND s."type" = $4 THEN um.rate ELSE NULL END), 2)
                    END
                ),
                'tv',  
                JSON_BUILD_OBJECT(
                    'allCount', SUM(CASE WHEN um."mediaType" = $2 AND s."type" = $5 THEN 1 ELSE 0 END),
                    'completedCount', SUM(CASE WHEN um."mediaType" = $2 AND s."type" = $5 AND um.watched = '${WatchedEnum.completed}' THEN 1 ELSE 0 END),
                    'plannedCount', SUM(CASE WHEN um."mediaType" = $2 AND s."type" = $5 AND um.watched = '${WatchedEnum.planned}' THEN 1 ELSE 0 END),
                    'pausedCount', SUM(CASE WHEN um."mediaType" = $2 AND s."type" = $5 AND um.watched = '${WatchedEnum.paused}' THEN 1 ELSE 0 END),
                    'abandonedCount', SUM(CASE WHEN um."mediaType" = $2 AND s."type" = $5 AND um.watched = '${WatchedEnum.abandoned}' THEN 1 ELSE 0 END),
                    'reviewingCount', SUM(CASE WHEN um."mediaType" = $2 AND s."type" = $5 AND um.watched = '${WatchedEnum.reviewing}' THEN 1 ELSE 0 END),
                    'viewingCount', SUM(CASE WHEN um."mediaType" = $2 AND s."type" = $5 AND um.watched = '${WatchedEnum.viewing}' THEN 1 ELSE 0 END),
                    'averageRating',  
                    CASE 
                        WHEN COUNT(CASE WHEN um."mediaType" = $2 AND s."type" = $5 AND um.rate IS NOT NULL THEN 1 ELSE NULL END) = 0 THEN 0
                        ELSE ROUND(AVG(CASE WHEN um."mediaType" = $2 AND s."type" = $5 THEN um.rate ELSE NULL END), 2)
                    END
                )
            ) as stats
        FROM  
            "userMedia" um
        LEFT JOIN
            "series" s ON um."mediaType" = $2 AND um."mediaId" = s."id"  
        WHERE
            um."userId" = $1;
        `,
        values: [
          userId,
          MediaEnum.series,
          SeriesEnum.animated,
          SeriesEnum.anime,
          SeriesEnum.tv,
        ],
      };
      this.logger.debug(`Executing query: (getSeriesStatsQuery)`);
      const res = await this.db.query(getSeriesStatsQuery);
      this.logger.log('Get series stats (end)');
      return res.rows[0].stats;
    } catch (err) {
      this.logger.error('Get series stats error', err);
      throw new InternalServerError('Get series stats error');
    }
  }
}
