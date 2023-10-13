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
import { BookEnum, MediaEnum, SortedEnum, WatchedEnum } from 'src/shared/enums';
import {
  BookBaseResponse,
  BookMediaResponse,
  BookSearchResponse,
  BooksStatsResponse,
} from 'src/shared/dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BooksService {
  constructor(
    @Inject('PG_CONNECTION') private db,
    private usersService: UsersService,
  ) {}
  private readonly logger = new Logger(BooksService.name);

  public async addBook(
    userId: string,
    mediaId: string,
    imageLink: string,
    dto: CreateMediaInput,
  ): Promise<void> {
    this.logger.log(`Add book (start)`);
    const { media } = dto;
    try {
      const addBookQuery = {
        text: `
        INSERT INTO "books" 
        ("id","type", "title", "year", "country", "description", "author", 
        "language", "genres", pages, "tags", "image", "creatorId", "report", "createdType")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
        values: [
          mediaId,
          media.bookType,
          media.title ? media.title.substring(0, 255) : '',
          media.year,
          media.country ? media.country.substring(0, 55) : '',
          media.description ? media.description.substring(0, 1020) : '',
          media.author
            ? media.author.map((author) => author.substring(0, 55))
            : [],
          media.language ? media.language.substring(0, 55) : '',
          media.genres
            ? media.genres.map((genre) => genre.substring(0, 55))
            : [],
          media.pages,
          media.tags ? media.tags.map((tag) => tag.substring(0, 55)) : [],
          imageLink,
          userId,
          dto.report ? dto.report.substring(0, 1020) : '',
          dto.createdType,
        ],
      };
      this.logger.debug(`Executing query: (addBookQuery)`);
      await this.db.query(addBookQuery);
    } catch (err) {
      this.logger.error('Add book error (Add book query)', err);
      throw new InternalServerError('Add error');
    }
    this.logger.log(`Add book (end)`);
  }

  public async searchBooks(
    userId: string,
    query: string,
  ): Promise<BookSearchResponse[]> {
    try {
      this.logger.log('Search books (start)');
      const searchBookQuery = {
        text: `
          SELECT 
              '${MediaEnum.book}' as "media",
              b.type as "bookType",
              b.id, b."title", b."year", b."country", b."description", b."author", 
              b."language", b."genres", b.pages, b."tags", b."image", b."isPublic",
              CASE WHEN um."mediaId" IS NOT NULL THEN TRUE ELSE FALSE END AS "inUserMedia"
          FROM 
              "books" b
          LEFT JOIN 
              "userMedia" um 
          ON 
              b.id = um."mediaId" AND um."mediaType" = '${MediaEnum.book}' AND um."userId" = $2
          WHERE 
              (b."isPublic" = true OR um."userId" = $2) 
              AND to_tsvector('english', "title") @@ to_tsquery('english', $1)`,
        values: [query, userId],
      };
      this.logger.debug(`Executing query: (searchBookQuery)`);
      const res = await this.db.query(searchBookQuery);
      this.logger.log('Search books (end)');
      return res.rows;
    } catch (err) {
      this.logger.error('Search books error', err);
      throw new InternalServerError('Search books error');
    }
  }

  public async getBook(
    userId: string,
    mediaId: string,
    followId: string,
  ): Promise<BookMediaResponse> {
    this.logger.log('Get book (start)');
    try {
      if (!!userId && !!followId) {
        const getBookQuery = {
          text: `
          SELECT
              '${MediaEnum.book}' as "media",
              b.type as "bookType",
              b.id, b."title", b."year", b."country", b."description", b."author", 
              b."language", b."genres", b.pages, b."tags", b."image", b."isPublic", um2."rate", um2."watched", um2."note",
              CASE WHEN um1."mediaId" IS NOT NULL THEN TRUE ELSE FALSE END AS "inUserMedia"
          FROM
              "books" b
          LEFT JOIN
              "userMedia" um1 ON b.id = um1."mediaId"
              AND um1."mediaType" = '${MediaEnum.book}'
              AND um1."userId" = $2
          LEFT JOIN
              userMedia um2 ON b.id = um2."mediaId"
              AND um2."mediaType" = '${MediaEnum.book}'
              AND um2."userId" = $3
          WHERE
          b.id = $1`,
          values: [mediaId, userId, followId],
        };
        this.logger.debug(`Executing query: (getBookQuery)`);
        const res = await this.db.query(getBookQuery);
        this.logger.log('Get book (end)');
        return res.rows[0];
      } else if (!!followId) {
        const getBookQuery = {
          text: `
          SELECT
              '${MediaEnum.book}' as "media",
              b.type as "bookType",
              b.id, b."title", b."year", b."country", b."description", b."author", 
              b."language", b."genres", b.pages, b."tags", b."image", b."isPublic", um."rate", um."watched", um."note"
          FROM
              "books" b
          LEFT JOIN
              "userMedia" um ON b.id = um."mediaId"
              AND um."mediaType" = '${MediaEnum.book}'
              AND um."userId" = $2
          WHERE
              b.id = $1`,
          values: [mediaId, followId],
        };
        this.logger.debug(`Executing query: (getBookQuery)`);
        const res = await this.db.query(getBookQuery);
        this.logger.log('Get book (end)');
        return { ...res.rows[0], inUserMedia: false };
      } else if (!!userId) {
        const getBookQuery = {
          text: `
          SELECT
              '${MediaEnum.book}' as "media",
              b.type as "bookType",
              b.id, b."title", b."year", b."country", b."description", b."author", 
              b."language", b."genres", b.pages, b."tags", b."image", b."isPublic", um."rate", um."watched", um."note",
              CASE WHEN um."mediaId" IS NOT NULL THEN TRUE ELSE FALSE END AS "inUserMedia"
          FROM
              "books" b
          LEFT JOIN
              "userMedia" um ON b.id = um."mediaId"
              AND um."mediaType" = '${MediaEnum.book}'
              AND um."userId" = $2
          WHERE
              b.id = $1
            `,
          values: [mediaId, userId],
        };
        this.logger.debug(`Executing query: (getBookQuery)`);
        const res = await this.db.query(getBookQuery);
        this.logger.log('Get book (end)');
        return res.rows[0];
      } else {
        throw new Error();
      }
    } catch (err) {
      this.logger.error('Get book error', err);
      throw new InternalServerError('Get book error');
    }
  }

  public async getCollectionBooks(
    dto: GetUserMediaInput,
  ): Promise<BookMediaResponse[]> {
    try {
      this.logger.log('Get collection books (start)');
      const { count, bookType, page, sorted, userId, watched } = dto;
      const offset = count * page;

      const getUserBooksQuery = {
        text: `
          SELECT
              '${MediaEnum.book}' as "media",
              b.type as "bookType",
              b.id, b."title", b."year", b."country", b."description", b."author", 
              b."language", b."genres", b.pages, b."tags", b."image", b."isPublic", um."rate", um."watched", um."note"
          FROM
              "books" b
          LEFT JOIN
              "userMedia" um
          ON
              um."mediaId" = b.id AND um."mediaType" = '${MediaEnum.book}'
          WHERE  um."userId" = $1
          ${bookType ? `AND b."type" = '${bookType}'` : ''}
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
              ? 'ORDER BY b.title ASC'
              : sorted === SortedEnum.titleDesc
              ? 'ORDER BY b.title DESC'
              : sorted === SortedEnum.yearAsc
              ? 'ORDER BY b.year ASC'
              : sorted === SortedEnum.yearDesc
              ? 'ORDER BY b.year DESC'
              : ''
          }
          LIMIT $2 OFFSET $3
          `,
        values: [userId, count, offset],
      };
      this.logger.debug(`Executing query: (getUserBooksQuery)`);
      const res = await this.db.query(getUserBooksQuery);
      this.logger.log(`Get collection books (end)`);
      return res.rows;
    } catch (err) {
      this.logger.error('Get book error', err);
      throw new InternalServerError('Get book error');
    }
  }

  public async getRandomBooks(
    userId: string,
    dto: GetRandomMediaInput,
  ): Promise<BookBaseResponse[]> {
    this.logger.log('Get random books (start)');
    const { count, bookType, InUserMedia, fromYear, genres, toYear } = dto;
    let res;
    try {
      if (InUserMedia) {
        const getRandomBookQuery = {
          text: `
          SELECT b."id", '${
            MediaEnum.book
          }' as "media", b."type" as "bookType", b."title", 
              b."year", b."country", b."description", b."author", 
              b."language", b."genres", b."pages", b."tags", b."image", b."isPublic"
          FROM "books" b
          LEFT JOIN
              "userMedia" um
          ON
              um."mediaId" = b.id AND um."mediaType" = '${MediaEnum.book}'
          WHERE  um."userId" = $1
              ${
                fromYear && toYear
                  ? `AND b."year" BETWEEN ${fromYear} AND ${toYear}`
                  : fromYear
                  ? `AND b."year" >= ${fromYear}`
                  : toYear
                  ? `AND b."year" <= ${toYear}`
                  : ''
              }
              ${
                genres && genres.length !== 0
                  ? `AND (ARRAY['${genres.join(`', '`)}']::varchar[] <@ b.genres
                  OR ARRAY['${genres.join(`', '`)}']::varchar[] && b.genres)`
                  : ''
              }
          ORDER BY RANDOM()
          LIMIT $2`,
          values: [userId, count],
        };
        this.logger.debug(`Executing query: (getRandomBookQuery)`);
        res = await this.db.query(getRandomBookQuery);
      } else {
        const getRandomBookPublicQuery = {
          text: `
            SELECT b."id", '${
              MediaEnum.book
            }' as "media", b."type" as "bookType", b."title", 
                b."year", b."country", b."description", b."author", 
                b."language", b."genres", b."pages", b."tags", b."image", b."isPublic"
            FROM "books" b
            LEFT JOIN "userMedia" um 
                ON b."id" = um."mediaId" 
                AND UM."mediaType" = '${MediaEnum.book}'
                AND um."userId" = $1 
                AND um."watched" <> '${WatchedEnum.planned}'
            WHERE um."mediaId" IS NULL
            ${bookType ? `AND b."type" = '${bookType}'` : ''}
            ${
              fromYear && toYear
                ? `AND b."year" BETWEEN ${fromYear} AND ${toYear}`
                : fromYear
                ? `AND b."year" >= ${fromYear}`
                : toYear
                ? `AND b."year" <= ${toYear}`
                : ''
            }
            ${
              genres && genres.length !== 0
                ? `AND (ARRAY['${genres.join(`', '`)}']::varchar[] <@ b.genres
              OR ARRAY['${genres.join(`', '`)}']::varchar[] && b.genres)`
                : ''
            }
            ORDER BY RANDOM()
            LIMIT $2
            `,
          values: [userId, count],
        };

        this.logger.debug(`Executing query: (getRandomBookPublicQuery)`);
        res = await this.db.query(getRandomBookPublicQuery);
      }
    } catch (err) {
      this.logger.error('Get random books error', err);
      throw new InternalServerError('Get random books error');
    }
    this.logger.log(`Get random books (end)`);
    return res.rows;
  }

  public async getModerBooks(): Promise<MediaModerResponse> {
    try {
      this.logger.log('Get moder books (start)');
      const getPrivateBooksQuery = {
        text: `
        SELECT *,
          TYPE AS "bookType",
          '${MediaEnum.book}' AS "media"
        FROM "books"
        WHERE "isChecked" = false
        ORDER BY "createdAt" ASC
        LIMIT 1
         `,
      };

      this.logger.debug(`Executing query: (getPrivateBooksQuery)`);
      const mediaRes = await this.db.query(getPrivateBooksQuery);
      const media = mediaRes.rows[0];

      const query = media.title
        .replace(/[^a-zA-Z0-9]/g, '')
        .trim()
        .split(' ')
        .join(' & ');

      const getBooksByTitleQuery = {
        text: `
        SELECT *, '${MediaEnum.book}' as media FROM "books"
        WHERE "isPublic" = 'true'
            AND to_tsvector('english', "title") @@ to_tsquery('english', $1)
         `,
        values: [query],
      };
      this.logger.debug(`Executing query: (getBooksByTitleQuery)`);
      const searchRes = await this.db.query(getBooksByTitleQuery);

      const creator = await this.usersService.getUserById(media.creatorId);

      this.logger.log('Get moder books (end)');
      return {
        media: media,
        createdType: media.createdType,
        report: media.report,
        searchMedia: searchRes.rows,
        creator: creator,
      };
    } catch (err) {
      this.logger.error('Get moder books error', err);
      throw new InternalServerError('Get moder books error');
    }
  }

  public async getReportBook(): Promise<MediaReportResponse> {
    this.logger.log('Get report book (start)');
    try {
      const getPrivateBookQuery = {
        text: `
        SELECT jsonb_build_object(
          'media', r."mediaType",
          'bookType', b."type",
          'id', b.id,
          'title', b."title",
          'year', b."year",
          'country', b."country",
          'description', b."description",
          'author', b."author",
          'language', b."language",
          'genres', b."genres",
          'pages', b.pages,
          'tags', b."tags",
          'image', b."image",
          'isPublic', b."isPublic"
      ) as "media",
      r."report",
      r."id" as "reportId",
      b."createdType",
      r."informerId",
      b."creatorId"
      FROM "reports" r
      LEFT JOIN "books" b ON r."mediaId" = b.id
      WHERE "mediaType" = '${MediaEnum.book}'
      ORDER BY r."createdAt" ASC
      LIMIT 1;
         `,
      };

      this.logger.debug(`Executing query: (getPrivateBookQuery)`);
      const res = await this.db.query(getPrivateBookQuery);
      const media = res.rows[0];

      const creator = await this.usersService.getUserById(media.creatorId);
      const informer = await this.usersService.getUserById(media.informerId);

      this.logger.log(`Get report book (end)`);
      return { ...media, creator: creator, informer: informer };
    } catch (err) {
      this.logger.error('Get report book error', err);
      throw new InternalServerError('Get report book error');
    }
  }

  public async updateBook(
    moderId: string,
    imageLink: string,
    embedding: number[],
    dto: AcceptModerMediaInput,
  ): Promise<void> {
    this.logger.log(`Update book (start)`);
    const { isPublic, media, mediaId, isChecked } = dto;
    try {
      const updateBookQuery = {
        text: `
        UPDATE "books"
        SET 
          "type" = $2,
          "title" = $3,
          "year" = $4,
          "country" = $5,
          "description" = $6,
          "author" = $7,
          "language" = $8,
          "genres" = $9,
          "pages" = $10,
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
          media.bookType,
          media.title ? media.title.substring(0, 255) : '',
          media.year,
          media.country ? media.country.substring(0, 55) : '',
          media.description ? media.description.substring(0, 1020) : '',
          media.author
            ? media.author.map((author) => author.substring(0, 55))
            : [],
          media.language ? media.language.substring(0, 55) : '',
          media.genres
            ? media.genres.map((genre) => genre.substring(0, 55))
            : [],
          media.pages,
          media.tags ? media.tags.map((tag) => tag.substring(0, 55)) : [],
          imageLink,
          moderId,
        ],
      };
      this.logger.debug(`Executing query: (updateBookQuery)`);
      await this.db.query(updateBookQuery);
    } catch (err) {
      this.logger.error('Update book error', err);
      throw new InternalServerError('Update book error');
    }
    this.logger.log(`Update book (end)`);
  }

  public async embeddingSearchBooks(
    userId: string,
    count: number,
    embedding: number[],
  ): Promise<BookSearchResponse[]> {
    this.logger.log('Embedding search books (start)');
    try {
      const embeddingSearchBookQuery = {
        text: `
          SELECT 
              '${MediaEnum.book}' as "media",
              b.type as "bookType",
              b.id, b."title", b."year", b."country", b."description", b."author", 
              b."language", b."genres", b.pages, b."tags", b."image", b."isPublic",
              CASE WHEN um."mediaId" IS NOT NULL THEN TRUE ELSE FALSE END AS "inUserMedia"
          FROM 
              "books" b
          LEFT JOIN 
              "userMedia" um 
          ON 
              b.id = um."mediaId" 
              AND um."mediaType" = '${MediaEnum.book}' 
              AND um."userId" = $2
          WHERE 
              b."isPublic" = true
          ORDER BY embedding <-> '[${embedding.join(', ')}]'
          LIMIT $1;`,
        values: [count, userId],
      };
      this.logger.debug(`Executing query: (embeddingSearchBookQuery)`);
      const res = await this.db.query(embeddingSearchBookQuery);
      this.logger.log('Embedding search books (end)');
      return res.rows;
    } catch (err) {
      this.logger.error('Embedding search books error', err);
      throw new InternalServerError('Embedding search books error');
    }
  }

  public async getEditBook(mediaId: string): Promise<BookBaseResponse> {
    this.logger.log('Get edit book (start)');
    try {
      const getEditFilmQuery = {
        text: `
          SELECT *,
            TYPE AS "bookType",
            '${MediaEnum.book}' AS "media"
          FROM "books"
          WHERE "id" = $1`,
        values: [mediaId],
      };

      this.logger.debug(`Executing query: (getEditFilmQuery)`);
      const res = await this.db.query(getEditFilmQuery);
      this.logger.log(`Get edit book (end)`);
      return res.rows[0];
    } catch (err) {
      this.logger.error('Get edit book error', err);
      throw new InternalServerError('Get edit book error');
    }
  }

  public async getNearBooks(
    userId: string,
    mediaId: string,
    count: number,
  ): Promise<BookSearchResponse[]> {
    this.logger.log('Get near books (start)');
    try {
      const embeddingSearchBookQuery = {
        text: `
          SELECT 
              '${MediaEnum.book}' as "media",
              b.type as "bookType",
              b.id, b."title", b."year", b."country", b."description", b."author", 
              b."language", b."genres", b.pages, b."tags", b."image", b."isPublic",
              CASE WHEN um."mediaId" IS NOT NULL THEN TRUE ELSE FALSE END AS "inUserMedia"
          FROM 
              "books" b
          LEFT JOIN 
              "userMedia" um 
          ON 
              b.id = um."mediaId" 
              AND um."mediaType" = '${MediaEnum.book}' 
              AND um."userId" = $2
          WHERE 
              b."isPublic" = true AND b.id != $3
          ORDER BY embedding <-> (SELECT embedding FROM "books"
              WHERE id = $3)
          LIMIT $1;`,
        values: [count, userId, mediaId],
      };
      this.logger.debug(`Executing query: (embeddingSearchBookQuery)`);
      const res = await this.db.query(embeddingSearchBookQuery);
      this.logger.log(`Get near books (end)`);
      return res.rows;
    } catch (err) {
      this.logger.error('Get near books error', err);
      throw new InternalServerError('Get near books error');
    }
  }

  public async getFollowBooks(
    userId: string,
    limit: number,
    offset: number,
  ): Promise<MediaFollowResponse[]> {
    this.logger.log('Get follow books (start)');
    try {
      const getFollowBooksQery = {
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
            'bookType', B."type",
            'id', B."id",
            'isPublic', B."isPublic",
            'title', B."title",
            'year', B."year",
            'country', B."country",
            'description', B."description",
            'author', B."author",
            'language', B."language",
            'pages', B."pages",
            'genres', B."genres",
            'tags', B."tags",
            'image', B."image"
          ) AS "media"
        FROM
          "followsMedia" FM
        JOIN books AS B ON FM."mediaId" = B.id;`,
        values: [userId, limit, offset, MediaEnum.book],
      };
      this.logger.debug(`Executing query: (getFollowBooksQery)`);
      const res = await this.db.query(getFollowBooksQery);
      this.logger.log('Get follow books (end)');
      return res.rows;
    } catch (err) {
      this.logger.error('Get follow books error', err);
      throw new InternalServerError('Get follow books error');
    }
  }

  public async deleteUserBook(mediaId: string): Promise<void> {
    this.logger.log('Delete user book (start)');
    try {
      const deleteUserBookQuery = {
        text: `
        DO $$ 
        DECLARE
        media_count integer;
        BEGIN
            SELECT COUNT(*) INTO media_count
            FROM "userMedia"
            WHERE "mediaType" = '${MediaEnum.book}' AND "mediaId" = '${mediaId}';

            IF media_count = 0 THEN
                DELETE FROM books WHERE id = '${mediaId}' AND NOT "isPublic";
            END IF;
        END $$;
        `,
      };
      this.logger.debug(`Executing query: (deleteUserBookQuery)`);
      await this.db.query(deleteUserBookQuery);
      this.logger.log('Delete user book (end)');
    } catch (err) {
      this.logger.error('Delete user book error', err);
      throw new InternalServerError('Delete user book error');
    }
  }

  public async getBooksStats(userId: string): Promise<BooksStatsResponse> {
    try {
      this.logger.log('Get books stats (start)');
      const getBooksStatsQuery = {
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
                'fiction',  
                JSON_BUILD_OBJECT(
                    'allCount', SUM(CASE WHEN um."mediaType" = $2 AND b."type" = $3 THEN 1 ELSE 0 END),
                    'completedCount', SUM(CASE WHEN um."mediaType" = $2 AND b."type" = $3 AND um.watched = '${WatchedEnum.completed}' THEN 1 ELSE 0 END),
                    'plannedCount', SUM(CASE WHEN um."mediaType" = $2 AND b."type" = $3 AND um.watched = '${WatchedEnum.planned}' THEN 1 ELSE 0 END),
                    'pausedCount', SUM(CASE WHEN um."mediaType" = $2 AND b."type" = $3 AND um.watched = '${WatchedEnum.paused}' THEN 1 ELSE 0 END),
                    'abandonedCount', SUM(CASE WHEN um."mediaType" = $2 AND b."type" = $3 AND um.watched = '${WatchedEnum.abandoned}' THEN 1 ELSE 0 END),
                    'reviewingCount', SUM(CASE WHEN um."mediaType" = $2 AND b."type" = $3 AND um.watched = '${WatchedEnum.reviewing}' THEN 1 ELSE 0 END),
                    'viewingCount', SUM(CASE WHEN um."mediaType" = $2 AND b."type" = $3 AND um.watched = '${WatchedEnum.viewing}' THEN 1 ELSE 0 END),
                    'averageRating',  
                    CASE 
                        WHEN COUNT(CASE WHEN um."mediaType" = $2 AND b."type" = $3 AND um.rate IS NOT NULL THEN 1 ELSE NULL END) = 0 THEN 0
                        ELSE ROUND(AVG(CASE WHEN um."mediaType" = $2 AND b."type" = $3 THEN um.rate ELSE NULL END), 2)
                    END
                ),
                'nonFiction',  
                JSON_BUILD_OBJECT(
                    'allCount', SUM(CASE WHEN um."mediaType" = $2 AND b."type" = $4 THEN 1 ELSE 0 END),
                    'completedCount', SUM(CASE WHEN um."mediaType" = $2 AND b."type" = $4 AND um.watched = '${WatchedEnum.completed}' THEN 1 ELSE 0 END),
                    'plannedCount', SUM(CASE WHEN um."mediaType" = $2 AND b."type" = $4 AND um.watched = '${WatchedEnum.planned}' THEN 1 ELSE 0 END),
                    'pausedCount', SUM(CASE WHEN um."mediaType" = $2 AND b."type" = $4 AND um.watched = '${WatchedEnum.paused}' THEN 1 ELSE 0 END),
                    'abandonedCount', SUM(CASE WHEN um."mediaType" = $2 AND b."type" = $4 AND um.watched = '${WatchedEnum.abandoned}' THEN 1 ELSE 0 END),
                    'reviewingCount', SUM(CASE WHEN um."mediaType" = $2 AND b."type" = $4 AND um.watched = '${WatchedEnum.reviewing}' THEN 1 ELSE 0 END),
                    'viewingCount', SUM(CASE WHEN um."mediaType" = $2 AND b."type" = $4 AND um.watched = '${WatchedEnum.viewing}' THEN 1 ELSE 0 END),
                    'averageRating',  
                    CASE 
                        WHEN COUNT(CASE WHEN um."mediaType" = $2 AND b."type" = $4 AND um.rate IS NOT NULL THEN 1 ELSE NULL END) = 0 THEN 0
                        ELSE ROUND(AVG(CASE WHEN um."mediaType" = $2 AND b."type" = $4 THEN um.rate ELSE NULL END), 2)
                    END
                )
            ) as stats
        FROM  
            "userMedia" um
        LEFT JOIN
            "books" b ON um."mediaType" = $2 AND um."mediaId" = b."id"  
        WHERE
            um."userId" = $1;
        `,
        values: [userId, MediaEnum.book, BookEnum.fiction, BookEnum.nonFiction],
      };
      this.logger.debug(`Executing query: (getBooksStatsQuery)`);
      const res = await this.db.query(getBooksStatsQuery);
      this.logger.log('Get books stats (end)');
      return res.rows[0].stats;
    } catch (err) {
      this.logger.error('Get books stats error', err);
      throw new InternalServerError('Get books stats error');
    }
  }
}
