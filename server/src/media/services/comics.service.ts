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
import {
  ComicsEnum,
  MediaEnum,
  SortedEnum,
  WatchedEnum,
} from 'src/shared/enums';
import {
  ComicsBaseResponse,
  ComicsMediaResponse,
  ComicsSearchResponse,
  ComicsStatsResponse,
} from 'src/shared/dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ComicsService {
  constructor(
    @Inject('PG_CONNECTION') private db,
    private usersService: UsersService,
  ) {}
  private readonly logger = new Logger(ComicsService.name);

  public async addComics(
    userId: string,
    mediaId: string,
    imageLink: string,
    dto: CreateMediaInput,
  ): Promise<void> {
    this.logger.log(`Add comics (start)`);
    const { media } = dto;
    try {
      const addComicsQuery = {
        text: `
        INSERT INTO "comics" 
        ("id", "type", "title", "startYear",  "endYear", "country", 
        "description", "author", "language", "volumes", "genres", "tags", "image", 
        "creatorId", "report", "createdType")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
        values: [
          mediaId,
          media.comicsType,
          media.title ? media.title.substring(0, 255) : '',
          media.startYear,
          media.endYear,
          media.country ? media.country.substring(0, 55) : '',
          media.description ? media.description.substring(0, 1020) : '',
          media.author
            ? media.author.map((author) => author.substring(0, 55))
            : [],
          media.language ? media.language?.substring(0, 55) : '',
          media.volumes,
          media.genres
            ? media.genres.map((genre) => genre.substring(0, 55))
            : [],
          media.tags.map((tag) => tag.substring(0, 55)),
          imageLink,
          userId,
          dto.report ? dto.report.substring(0, 1020) : '',
          dto.createdType,
        ],
      };
      this.logger.debug(`Executing query: (addComicsQuery)`);
      await this.db.query(addComicsQuery);
    } catch (err) {
      this.logger.error('Add comics error (Add comics query)', err);
      throw new InternalServerError('Add comics error');
    }
    this.logger.log(`Add comics (end)`);
  }

  public async searchComics(
    userId: string,
    query: string,
  ): Promise<ComicsSearchResponse[]> {
    this.logger.log('Search comics (start)');
    try {
      const searchComicsQuery = {
        text: `
          SELECT 
              '${MediaEnum.comics}' as "media",
              c.type as "comicsType",
              c.id, c."title", c."startYear",  c."endYear", c."country", c."description", c."author", 
              c."language", c."genres", c."tags", c."image", c."isPublic",
              CASE WHEN um."mediaId" IS NOT NULL THEN TRUE ELSE FALSE END AS "inUserMedia"
          FROM 
              "comics" c
          LEFT JOIN 
              "userMedia" um 
          ON 
              c.id = um."mediaId" AND um."mediaType" = '${MediaEnum.comics}' AND um."userId" = $2
          WHERE 
              (c."isPublic" = true OR um."userId" = $2) 
              AND to_tsvector('english', "title") @@ to_tsquery('english', $1)`,
        values: [query, userId],
      };
      this.logger.debug(`Executing query: (searchComicsQuery)`);
      const res = await this.db.query(searchComicsQuery);
      this.logger.log('Search comics (end)');
      return res.rows;
    } catch (err) {
      this.logger.error('Search comics error', err);
      throw new InternalServerError('Search comics error');
    }
  }

  public async getComics(
    userId: string,
    mediaId: string,
    followId: string,
  ): Promise<ComicsMediaResponse> {
    this.logger.log('Get comics (start)');
    try {
      if (!!userId && !!followId) {
        const getСomicsQuery = {
          text: `
          SELECT
              '${MediaEnum.comics}' as "media",
              c.type as "comicsType",
              c.id, c."title", c."startYear",  c."endYear", c."country", c."description", c."author", 
              c."language", c."genres", c."tags", c."image", c."isPublic", um2."rate", um2."watched", um2."note",
              CASE WHEN um1."mediaId" IS NOT NULL THEN TRUE ELSE FALSE END AS "inUserMedia"
          FROM
              "comics" c
          LEFT JOIN
              "userMedia" um1 ON c.id = um1."mediaId"
              AND um1."mediaType" = '${MediaEnum.comics}'
              AND um1."userId" = $2
          LEFT JOIN
              "userMedia" um2 ON c.id = um2."mediaId"
              AND um2."mediaType" = '${MediaEnum.comics}'
              AND um2."userId" = $3
          WHERE
              c.id = $1`,
          values: [mediaId, userId, followId],
        };
        this.logger.debug(`Executing query: (getСomicsQuery)`);
        const res = await this.db.query(getСomicsQuery);
        this.logger.log('Get comics (end)');
        return res.rows[0];
      } else if (!!followId) {
        const getСomicsQuery = {
          text: `
          SELECT
              '${MediaEnum.comics}' as "media",
              c.type as "comicsType",
              c.id, c."title", c."startYear",  c."endYear", c."country", c."description", c."author", 
              c."language", c."genres", c."tags", c."image", c."isPublic", um."rate", um."watched", um."note"
          FROM
              "comics" c
          LEFT JOIN
              "userMedia" um ON c.id = um."mediaId"
              AND um."mediaType" = '${MediaEnum.comics}'
              AND um."userId" = $2
          WHERE
              c.id = $1`,
          values: [mediaId, followId],
        };
        this.logger.debug(`Executing query: (getСomicsQuery)`);
        const res = await this.db.query(getСomicsQuery);
        this.logger.log('Get comics (end)');
        return { ...res.rows[0], inUserMedia: false };
      } else if (!!userId) {
        const getСomicsQuery = {
          text: `
            SELECT
                '${MediaEnum.comics}' as "media",
                c.type as "comicsType",
                c.id, c."title", c."startYear",  c."endYear", c."country", c."description", c."author", 
                c."language", c."genres", c."tags", c."image", c."isPublic", um."rate", um."watched", um."note",
                CASE WHEN um."mediaId" IS NOT NULL THEN TRUE ELSE FALSE END AS "inUserMedia"
            FROM
                "comics" c
            LEFT JOIN
                "userMedia" um ON c.id = um."mediaId"
                AND um."mediaType" = '${MediaEnum.comics}'
                AND um."userId" = $2
            WHERE
                c.id = $1
            `,
          values: [mediaId, userId],
        };
        this.logger.debug(`Executing query: (getСomicsQuery)`);
        const res = await this.db.query(getСomicsQuery);
        this.logger.log('Get comics (end)');
        return res.rows[0];
      } else {
        throw new Error();
      }
    } catch (err) {
      this.logger.error('Get comics error', err);
      throw new InternalServerError('Get comics error');
    }
  }

  public async getCollectionComics(
    dto: GetUserMediaInput,
  ): Promise<ComicsMediaResponse[]> {
    try {
      this.logger.log('Get collection comics (start)');
      const { count, comicsType, page, sorted, userId, watched } = dto;
      const offset = count * page;

      const getUserComicsQuery = {
        text: `
          SELECT
              '${MediaEnum.comics}' as "media",
              c.type as "comicsType",
              c.id, c."title", c."startYear",  c."endYear", c."country", c."description", c."author", 
              c."language", c."genres", c."tags", c."image", c."isPublic", um."rate", um."watched", um."note"
          FROM
              "comics" c
          LEFT JOIN
              "userMedia" um
          ON
              um."mediaId" = c.id AND um."mediaType" = '${MediaEnum.comics}'
          WHERE  um."userId" = $1
          ${comicsType ? `AND c."type" = '${comicsType}'` : ''}
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
              ? 'ORDER BY um.rate ASC'
              : sorted === SortedEnum.rateDesc
              ? 'ORDER BY um.rate DESC'
              : sorted === SortedEnum.titleAsc
              ? 'ORDER BY c.title ASC'
              : sorted === SortedEnum.titleDesc
              ? 'ORDER BY c.title DESC'
              : sorted === SortedEnum.yearAsc
              ? 'ORDER BY c."startYear" ASC'
              : sorted === SortedEnum.yearDesc
              ? 'ORDER BY c."startYear" DESC'
              : ''
          }
          LIMIT $2 OFFSET $3
          `,
        values: [userId, count, offset],
      };
      this.logger.debug(`Executing query: (getUserComicsQuery)`);
      const res = await this.db.query(getUserComicsQuery);
      this.logger.log(`Get collection comics (end)`);
      return res.rows;
    } catch (err) {
      this.logger.error('Get collection comics error', err);
      throw new InternalServerError('Get collection comics error');
    }
  }

  public async getRandomComics(
    userId: string,
    dto: GetRandomMediaInput,
  ): Promise<ComicsBaseResponse[]> {
    this.logger.log('Get random comics (start)');
    const { count, comicsType, InUserMedia, fromYear, genres, toYear } = dto;
    let res;
    try {
      if (InUserMedia) {
        const getRandomComicsQuery = {
          text: `
          SELECT
              '${MediaEnum.comics}' as "media",
              c.type as "comicsType",
              c.id, c."title", c."startYear",  c."endYear", c."country", c."description", c."author", 
              c."language", c."genres", c."tags", c."image", c."isPublic"
          FROM
              "comics" c
          LEFT JOIN
              "userMedia" um
          ON
              um."mediaId" = c.id AND um."mediaType" = '${MediaEnum.comics}'
          WHERE  um."userId" = $1
              ${
                fromYear && toYear
                  ? `AND c."startYear" BETWEEN ${fromYear} AND ${toYear}`
                  : fromYear
                  ? `AND c."startYear" >= ${fromYear}`
                  : toYear
                  ? `AND c."startYear" <= ${toYear}`
                  : ''
              }
              ${
                genres && genres.length !== 0
                  ? `AND (ARRAY['${genres.join(`', '`)}']::varchar[] <@ c.genres
                  OR ARRAY['${genres.join(`', '`)}']::varchar[] && c.genres)`
                  : ''
              }
          ORDER BY RANDOM()
          LIMIT $2`,
          values: [userId, count],
        };
        this.logger.debug(`Executing query: (getRandomComicsQuery)`);
        res = await this.db.query(getRandomComicsQuery);
      } else {
        const getRandomComicsPublicQuery = {
          text: `
            SELECT  c."id", '${
              MediaEnum.comics
            }' as "media", c."type" as "comicsType", c."title", c."startYear",
              c."endYear", c."country", c."description", c."author", 
                c."language", c."genres", c."tags", c."image", c."isPublic"
            FROM "comics" c
            LEFT JOIN "userMedia" um 
                ON c."id" = um."mediaId" 
                AND UM."mediaType" = '${MediaEnum.comics}'
                AND um."userId" = $1 
                AND um."watched" <> '${WatchedEnum.planned}'
            WHERE um."mediaId" IS NULL
            ${comicsType ? `AND c."type" = '${comicsType}'` : ''}
            ${
              fromYear && toYear
                ? `AND c."startYear" BETWEEN ${fromYear} AND ${toYear}`
                : fromYear
                ? `AND c."startYear" >= ${fromYear}`
                : toYear
                ? `AND c."startYear" <= ${toYear}`
                : ''
            }
            ${
              genres && genres.length !== 0
                ? `AND (ARRAY['${genres.join(`', '`)}']::varchar[] <@ c.genres
              OR ARRAY['${genres.join(`', '`)}']::varchar[] && c.genres)`
                : ''
            }
            ORDER BY RANDOM()
            LIMIT $2
            `,
          values: [userId, count],
        };

        this.logger.debug(`Executing query: (getRandomComicsPublicQuery)`);
        res = await this.db.query(getRandomComicsPublicQuery);
      }
    } catch (err) {
      this.logger.error('Get random comics error', err);
      throw new InternalServerError('Get random comics error');
    }
    this.logger.log(`Get random comics (end)`);
    return res.rows;
  }

  public async getModerComics(): Promise<MediaModerResponse> {
    try {
      this.logger.log('Get moder comics (start)');
      const getPrivateSeriesQuery = {
        text: `
        SELECT *,
          TYPE AS "comicsType",
          '${MediaEnum.comics}' AS "media"
        FROM "comics"
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
      const getComicsByTitleQuery = {
        text: `
        SELECT *, '${MediaEnum.comics}' as media FROM "comics"
        WHERE "isPublic" = 'true'
            AND to_tsvector('english', "title") @@ to_tsquery('english', $1)
         `,
        values: [query],
      };

      this.logger.debug(`Executing query: (getComicsByTitleQuery)`);
      const searchRes = await this.db.query(getComicsByTitleQuery);

      const creator = await this.usersService.getUserById(media.creatorId);

      this.logger.log('Get moder comics (start)');
      return {
        media: media,
        createdType: media.createdType,
        report: media.report,
        searchMedia: searchRes.rows,
        creator: creator,
      };
    } catch (err) {
      this.logger.error('Get moder comics error', err);
      throw new InternalServerError('Get moder comics error');
    }
  }

  public async getReportComics(): Promise<MediaReportResponse> {
    this.logger.log('Get report comics (start)');
    try {
      const getPrivateComicsQuery = {
        text: `
        SELECT jsonb_build_object(
          'media', r."mediaType",
          'comicsType', c."type",
          'id', c.id,
          'title', c."title",
          'startYear', c."startYear",
          'endYear', c."endYear",
          'country', c."country",
          'description', c."description",
          'author', c."author",
          'language', c."language",
          'genres', c."genres",
          'tags', c."tags",
          'image', c."image",
          'isPublic', c."isPublic"
          
      ) as "media",
          r."report",
          r."id" as "reportId"
          c."createdType",
          r."informerId",
          c."creatorId"
      FROM "reports" r
      LEFT JOIN "comics" c ON r."mediaId" = c.id
      WHERE "mediaType" = '${MediaEnum.comics}'
      ORDER BY r."createdAt" ASC
      LIMIT 1;
         `,
      };

      this.logger.debug(`Executing query: (getPrivateComicsQuery)`);
      const res = await this.db.query(getPrivateComicsQuery);
      const media = res.rows[0];

      const creator = await this.usersService.getUserById(media.creatorId);
      const informer = await this.usersService.getUserById(media.informerId);

      this.logger.log(`Get report comics (end)`);
      return { ...media, creator: creator, informer: informer };
    } catch (err) {
      this.logger.error('Get report comics error', err);
      throw new InternalServerError('Get report comics error');
    }
  }

  public async updateComics(
    moderId: string,
    imageLink: string,
    embedding: number[],
    dto: AcceptModerMediaInput,
  ): Promise<void> {
    this.logger.log(`Update comics (start)`);
    const { isPublic, media, mediaId, isChecked } = dto;
    try {
      const updateComicsQuery = {
        text: `
        UPDATE "comics" 
        SET 
          "type" = $2,
          "title" = $3,
          "startYear" = $4,
          "endYear" = $5,
          "country" = $6,
          "description" = $7,
          "author" = $8,
          "language" = $9,
          "volumes" = $10,
          "genres" = $11,
          "tags" = $12,
          "image" = $13,
          ${
            isPublic
              ? `"isPublic" = 'true',
            "embedding" = '[${embedding.join(', ')}]',`
              : ''
          }
          ${!!isChecked ? `"isChecked" = 'true',` : ''}
          "moderId" = $14

        WHERE "id" = $1;`,
        values: [
          mediaId,
          media.comicsType,
          media.title ? media.title.substring(0, 255) : '',
          media.startYear,
          media.endYear,
          media.country ? media.country.substring(0, 55) : '',
          media.description ? media.description.substring(0, 1020) : '',
          media.author
            ? media.author.map((author) => author.substring(0, 55))
            : [],
          media.language ? media.language?.substring(0, 55) : '',
          media.volumes,
          media.genres
            ? media.genres.map((genre) => genre.substring(0, 55))
            : [],
          media.tags.map((tag) => tag.substring(0, 55)),
          imageLink,
          moderId,
        ],
      };
      this.logger.debug(`Executing query: (updateComicsQuery)`);
      await this.db.query(updateComicsQuery);
    } catch (err) {
      this.logger.error('Update comics error', err);
      throw new InternalServerError('Update comics error');
    }
    this.logger.log(`Update comics (end)`);
  }

  public async embeddingSearchComics(
    userId: string,
    count: number,
    embedding: number[],
  ): Promise<ComicsSearchResponse[]> {
    this.logger.log('Embedding search comics (start)');
    try {
      const embeddingSearchComicsQuery = {
        text: `
      SELECT 
          '${MediaEnum.comics}' as "media",
          c.type as "comicsType",
          c.id, c."title", c."startYear",  c."endYear", c."country", c."description", c."author", 
          c."language", c."genres", c."tags", c."image", c."isPublic",
          CASE WHEN um."mediaId" IS NOT NULL THEN TRUE ELSE FALSE END AS "inUserMedia"
      FROM 
          "comics" c
      LEFT JOIN 
          "userMedia" um 
      ON 
          c.id = um."mediaId" 
          AND um."mediaType" = '${MediaEnum.comics}' 
          AND um."userId" = $2
      WHERE 
          c."isPublic" = true
      ORDER BY embedding <-> '[${embedding.join(', ')}]'
      LIMIT $1;`,
        values: [count, userId],
      };
      this.logger.debug(`Executing query: (embeddingSearchComicsQuery)`);
      const res = await this.db.query(embeddingSearchComicsQuery);

      this.logger.log('Embedding search comics (end)');
      return res.rows;
    } catch (err) {
      this.logger.error('Embedding search comics error', err);
      throw new InternalServerError('Embedding search comics error');
    }
  }

  public async getEditComics(mediaId: string): Promise<ComicsBaseResponse> {
    this.logger.log('Get edit comics (start)');
    try {
      const getEditFilmQuery = {
        text: `
          SELECT *,
            TYPE AS "comicsType",
            '${MediaEnum.comics}' AS "media"
          FROM "comics"
          WHERE "id" = $1`,
        values: [mediaId],
      };

      this.logger.debug(`Executing query: (getEditFilmQuery)`);
      const res = await this.db.query(getEditFilmQuery);
      this.logger.log(`Get edit comics (end)`);
      return res.rows[0];
    } catch (err) {
      this.logger.error('Get edit comics error', err);
      throw new InternalServerError('Get edit comics error');
    }
  }

  public async getNearComics(
    userId: string,
    mediaId: string,
    count: number,
  ): Promise<ComicsSearchResponse[]> {
    this.logger.log('Get near comics (start)');
    try {
      const embeddingSearchComicsQuery = {
        text: `
          SELECT 
              '${MediaEnum.comics}' as "media",
              c.type as "comicsType",
              c.id, c."title", c."startYear",  c."endYear", c."country", c."description", c."author", 
              c."language", c."genres", c."tags", c."image", c."isPublic",
              CASE WHEN um."mediaId" IS NOT NULL THEN TRUE ELSE FALSE END AS "inUserMedia"
          FROM 
              "comics" c
          LEFT JOIN 
              "userMedia" um 
          ON 
              c.id = um."mediaId" 
              AND um."mediaType" = '${MediaEnum.comics}' 
              AND um."userId" = $2
          WHERE 
              c."isPublic" = true AND c.id != $3
          ORDER BY embedding <-> (SELECT embedding FROM "comics"
              WHERE id = $3)
          LIMIT $1;`,
        values: [count, userId, mediaId],
      };
      this.logger.debug(`Executing query: (embeddingSearchComicsQuery)`);
      const res = await this.db.query(embeddingSearchComicsQuery);
      this.logger.log(`Get near comics (end)`);
      return res.rows;
    } catch (err) {
      this.logger.error('Get near comics error', err);
      throw new InternalServerError('Get near comics error');
    }
  }

  public async getFollowComics(
    userId: string,
    limit: number,
    offset: number,
  ): Promise<MediaFollowResponse[]> {
    this.logger.log('Get follow comics (start)');
    try {
      const getFollowComicsQuery = {
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
            'comicsType', C."type",
            'id', C."id",
            'isPublic', C."isPublic",
            'title', C."title",
            'startYear', C."startYear",
            'endYear', C."endYear",
            'country', C."country",
            'description', C."description",
            'author', C."author",
            'language', C."language",
            'volumes', C."volumes",
            'genres', C."genres",
            'tags', C."tags",
            'image', C."image"
          ) AS "media"
        FROM
          "followsMedia" FM
          JOIN COMICS AS C ON FM."mediaId" = C.id;`,
        values: [userId, limit, offset, MediaEnum.comics],
      };
      this.logger.debug(`Executing query: (getFollowComicsQuery)`);
      const res = await this.db.query(getFollowComicsQuery);
      this.logger.log('Get follow comics (end)');
      return res.rows;
    } catch (err) {
      this.logger.error('Get follow comics error', err);
      throw new InternalServerError('Get follow comics error');
    }
  }

  public async deleteUserComics(mediaId: string): Promise<void> {
    this.logger.log('Delete user comics (start)');
    try {
      const deleteUserComicsQuery = {
        text: `
        DO $$ 
        DECLARE
        media_count integer;
        BEGIN
            SELECT COUNT(*) INTO media_count
            FROM "userMedia"
            WHERE "mediaType" = '${MediaEnum.comics}' AND "mediaId" = '${mediaId}';

            IF media_count = 0 THEN
                DELETE FROM comics WHERE id = '${mediaId}' AND NOT "isPublic";
            END IF;
        END $$;
        `,
      };
      this.logger.debug(`Executing query: (deleteUserComicsQuery)`);
      await this.db.query(deleteUserComicsQuery);
      this.logger.log('Delete user comics (end)');
    } catch (err) {
      this.logger.error('Delete user comics error', err);
      throw new InternalServerError('Delete user comics error');
    }
  }

  public async getComicsStats(userId: string): Promise<ComicsStatsResponse> {
    try {
      this.logger.log('Get comics stats (start)');
      const getComicsStatsQuery = {
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
                'comics',  
                JSON_BUILD_OBJECT(
                    'allCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $3 THEN 1 ELSE 0 END),
                    'completedCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $3 AND um.watched = '${WatchedEnum.completed}' THEN 1 ELSE 0 END),
                    'plannedCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $3 AND um.watched = '${WatchedEnum.planned}' THEN 1 ELSE 0 END),
                    'pausedCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $3 AND um.watched = '${WatchedEnum.paused}' THEN 1 ELSE 0 END),
                    'abandonedCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $3 AND um.watched = '${WatchedEnum.abandoned}' THEN 1 ELSE 0 END),
                    'reviewingCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $3 AND um.watched = '${WatchedEnum.reviewing}' THEN 1 ELSE 0 END),
                    'viewingCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $3 AND um.watched = '${WatchedEnum.viewing}' THEN 1 ELSE 0 END),
                    'averageRating',  
                    CASE 
                        WHEN COUNT(CASE WHEN um."mediaType" = $2 AND c."type" = $3 AND um.rate IS NOT NULL THEN 1 ELSE NULL END) = 0 THEN 0
                        ELSE ROUND(AVG(CASE WHEN um."mediaType" = $2 AND c."type" = $3 THEN um.rate ELSE NULL END), 2)
                    END
                ),
                'graphicNovel',  
                JSON_BUILD_OBJECT(
                    'allCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $4 THEN 1 ELSE 0 END),
                    'completedCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $4 AND um.watched = '${WatchedEnum.completed}' THEN 1 ELSE 0 END),
                    'plannedCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $4 AND um.watched = '${WatchedEnum.planned}' THEN 1 ELSE 0 END),
                    'pausedCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $4 AND um.watched = '${WatchedEnum.paused}' THEN 1 ELSE 0 END),
                    'abandonedCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $4 AND um.watched = '${WatchedEnum.abandoned}' THEN 1 ELSE 0 END),
                    'reviewingCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $4 AND um.watched = '${WatchedEnum.reviewing}' THEN 1 ELSE 0 END),
                    'viewingCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $4 AND um.watched = '${WatchedEnum.viewing}' THEN 1 ELSE 0 END),
                    'averageRating',  
                    CASE 
                        WHEN COUNT(CASE WHEN um."mediaType" = $2 AND c."type" = $4 AND um.rate IS NOT NULL THEN 1 ELSE NULL END) = 0 THEN 0
                        ELSE ROUND(AVG(CASE WHEN um."mediaType" = $2 AND c."type" = $4 THEN um.rate ELSE NULL END), 2)
                    END
                ),
                'manga',  
                JSON_BUILD_OBJECT(
                    'allCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $5 THEN 1 ELSE 0 END),
                    'completedCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $5 AND um.watched = '${WatchedEnum.completed}' THEN 1 ELSE 0 END),
                    'plannedCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $5 AND um.watched = '${WatchedEnum.planned}' THEN 1 ELSE 0 END),
                    'pausedCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $5 AND um.watched = '${WatchedEnum.paused}' THEN 1 ELSE 0 END),
                    'abandonedCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $5 AND um.watched = '${WatchedEnum.abandoned}' THEN 1 ELSE 0 END),
                    'reviewingCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $5 AND um.watched = '${WatchedEnum.reviewing}' THEN 1 ELSE 0 END),
                    'viewingCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $5 AND um.watched = '${WatchedEnum.viewing}' THEN 1 ELSE 0 END),
                    'averageRating',  
                    CASE 
                        WHEN COUNT(CASE WHEN um."mediaType" = $2 AND c."type" = $5 AND um.rate IS NOT NULL THEN 1 ELSE NULL END) = 0 THEN 0
                        ELSE ROUND(AVG(CASE WHEN um."mediaType" = $2 AND c."type" = $5 THEN um.rate ELSE NULL END), 2)
                    END
                ),
                'manhwa',  
                JSON_BUILD_OBJECT(
                    'allCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $6 THEN 1 ELSE 0 END),
                    'completedCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $6 AND um.watched = '${WatchedEnum.completed}' THEN 1 ELSE 0 END),
                    'plannedCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $6 AND um.watched = '${WatchedEnum.planned}' THEN 1 ELSE 0 END),
                    'pausedCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $6 AND um.watched = '${WatchedEnum.paused}' THEN 1 ELSE 0 END),
                    'abandonedCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $6 AND um.watched = '${WatchedEnum.abandoned}' THEN 1 ELSE 0 END),
                    'reviewingCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $6 AND um.watched = '${WatchedEnum.reviewing}' THEN 1 ELSE 0 END),
                    'viewingCount', SUM(CASE WHEN um."mediaType" = $2 AND c."type" = $6 AND um.watched = '${WatchedEnum.viewing}' THEN 1 ELSE 0 END),
                    'averageRating',  
                    CASE 
                        WHEN COUNT(CASE WHEN um."mediaType" = $2 AND c."type" = $6 AND um.rate IS NOT NULL THEN 1 ELSE NULL END) = 0 THEN 0
                        ELSE ROUND(AVG(CASE WHEN um."mediaType" = $2 AND c."type" = $6 THEN um.rate ELSE NULL END), 2)
                    END
                )
            ) as stats
        FROM  
            "userMedia" um
        LEFT JOIN
            "comics" c ON um."mediaType" = $2 AND um."mediaId" = c."id"  
        WHERE
            um."userId" = $1;
        `,
        values: [
          userId,
          MediaEnum.comics,
          ComicsEnum.comics,
          ComicsEnum.graphicNovel,
          ComicsEnum.manga,
          ComicsEnum.manhwa,
        ],
      };
      this.logger.debug(`Executing query: (getComicsStatsQuery)`);
      const res = await this.db.query(getComicsStatsQuery);
      this.logger.log('Get comics stats (end)');
      return res.rows[0].stats;
    } catch (err) {
      this.logger.error('Get comics stats error', err);
      throw new InternalServerError('Get comics stats error');
    }
  }
}
