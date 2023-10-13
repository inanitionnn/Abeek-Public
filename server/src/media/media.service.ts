import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  AcceptModerMediaInput,
  CreateMediaInput,
  EmbeddingSearchInput,
  GenresResponse,
  GetFollowsMediaInput,
  GetGenresInput,
  GetMediaInput,
  GetModerEditMediaInput,
  GetModerMediaCountResponse,
  GetNearestMediaInput,
  GetRandomMediaInput,
  GetUserMediaInput,
  MediaFollowResponse,
  SearchInput,
} from './dto';
import * as uuid from 'uuid';
import { FilesService } from 'src/files/files.service';
import { ProfileInfoReponse, SuccessResponse } from 'src/shared/dto';
import { MediaEnum, ReportEnum, WatchedEnum } from 'src/shared/enums';
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from 'src/shared/errors';
import {
  GetMediaType,
  MediaBaseType,
  MediaModerType,
  MediaSearchType,
} from './types';
import { UsersService } from 'src/users/users.service';
import { GptService } from 'src/parse/services';
import { UserMediaService } from 'src/user-media/user-media.service';
import {
  BooksService,
  ComicsService,
  FilmsService,
  SeriesSeasonsService,
  SeriesService,
  UserSeasonsService,
} from './services';
import { ReportsService } from 'src/reports/reports.service';
import { UpdateUserMediaInput } from 'src/user-media/dto';
import { MediaReportResponse } from './dto/mediaReport.response';
import { MediaModerResponse } from './dto/mediaModer.response';

@Injectable()
export class MediaService {
  constructor(
    @Inject('PG_CONNECTION') private db,
    private filesService: FilesService,
    private userMediaService: UserMediaService,
    private reportsService: ReportsService,
    private usersService: UsersService,
    private gptService: GptService,
    private filmsService: FilmsService,
    private seriesService: SeriesService,
    private comicsService: ComicsService,
    private booksService: BooksService,
    private seriesSeasonsService: SeriesSeasonsService,
    private userSeasonsService: UserSeasonsService,
  ) {}
  private readonly logger = new Logger(MediaService.name);

  public async updateUserMedia(
    userId: string,
    dto: UpdateUserMediaInput,
  ): Promise<SuccessResponse> {
    this.logger.log('Update user media (start)');
    const { watched, seasons, mediaId } = dto;
    await this.userMediaService.updateUserMedia(userId, dto);
    if (!seasons) {
      this.logger.log('Update user media (end)');
      return { success: true };
    }
    if (watched === WatchedEnum.planned) {
      await this.userSeasonsService.deleteUserSeasons(userId, mediaId);
    } else {
      await this.userSeasonsService.updateUserSeasons(userId, mediaId, seasons);
    }
    this.logger.log('Update user media (end)');
    return { success: true };
  }

  public async getProfileInfo(userId: string): Promise<ProfileInfoReponse> {
    this.logger.log('Get stats (start)');

    const filmsStats = await this.filmsService.getFilmsStats(userId);
    const seriesStats = await this.seriesService.getSeriesStats(userId);
    const comicsStats = await this.comicsService.getComicsStats(userId);
    const booksStats = await this.booksService.getBooksStats(userId);
    const userInfo = await this.usersService.getUserInfo(userId);

    const res: ProfileInfoReponse = {
      ...userInfo,
      mediaStats: {
        films: filmsStats,
        series: seriesStats,
        comics: comicsStats,
        books: booksStats,
      },
    };

    this.logger.log('Get stats (end)');
    return res;
  }

  public async deleteMediaFromCollection(
    userId: string,
    mediaId: string,
  ): Promise<SuccessResponse> {
    this.logger.log('Delete media from collection (start)');
    const userMedia = await this.userMediaService.deleteUserMedia(
      userId,
      mediaId,
    );
    switch (userMedia.mediaType) {
      case MediaEnum.film: {
        await this.filmsService.deleteUserFilm(userMedia.mediaId);
        break;
      }
      case MediaEnum.series: {
        await this.seriesService.deleteUserSeries(userMedia.mediaId);
        await this.userSeasonsService.deleteUserSeasons(
          userId,
          userMedia.mediaId,
        );
        break;
      }
      case MediaEnum.comics: {
        await this.comicsService.deleteUserComics(userMedia.mediaId);
        break;
      }
      case MediaEnum.book: {
        await this.booksService.deleteUserBook(mediaId);
        break;
      }
    }
    this.logger.log('Delete media from collection (end)');
    return { success: true };
  }

  public async getFollowsMedia(
    userId: string,
    dto: GetFollowsMediaInput,
  ): Promise<Array<MediaFollowResponse>> {
    this.logger.log('Get follows media (start)');
    const { count, page } = dto;
    const offset = count * page;
    const films = await this.filmsService.getFollowFilms(userId, count, offset);
    const series = await this.seriesService.getFollowSeries(
      userId,
      count,
      offset,
    );
    const comics = await this.comicsService.getFollowComics(
      userId,
      count,
      offset,
    );
    const books = await this.booksService.getFollowBooks(userId, count, offset);
    this.logger.log('Get follows media (end)');

    const res = [...films, ...series, ...comics, ...books].sort((a, b) => {
      const updatedAtA = new Date(a.userMedia.updatedAt);
      const updatedAtB = new Date(b.userMedia.updatedAt);
      return updatedAtB.getTime() - updatedAtA.getTime();
    });

    return res;
  }

  public async getNearMedia(
    dto: GetNearestMediaInput,
    userId: string,
  ): Promise<Array<typeof MediaSearchType>> {
    this.logger.log('Get nearest media (start)');
    const { mediaType, mediaId, count } = dto;
    let res: Array<typeof MediaSearchType>;

    switch (mediaType) {
      case MediaEnum.film: {
        res = await this.filmsService.getNearFilms(userId, mediaId, count);
        break;
      }
      case MediaEnum.series: {
        res = await this.seriesService.getNearSeries(userId, mediaId, count);
        break;
      }
      case MediaEnum.comics: {
        res = await this.comicsService.getNearComics(userId, mediaId, count);
        break;
      }
      case MediaEnum.book: {
        res = await this.booksService.getNearBooks(userId, mediaId, count);
        break;
      }
    }

    this.logger.log('Get nearest media (end)');
    return res;
  }

  public async getModerEditMedia(
    dto: GetModerEditMediaInput,
  ): Promise<typeof MediaModerType> {
    this.logger.log('Get moder edit media (start)');
    const { mediaId, mediaType } = dto;

    let res: typeof MediaModerType;

    switch (mediaType) {
      case MediaEnum.film: {
        res = await this.filmsService.getEditFilm(mediaId);
        break;
      }
      case MediaEnum.series: {
        const seriesRes = await this.seriesService.getEditSeries(mediaId);
        const seasonsRes = await this.seriesSeasonsService.getSeriesSeasons(
          mediaId,
        );
        res = { ...seriesRes, seasons: [...seasonsRes] };
        break;
      }
      case MediaEnum.comics: {
        res = await this.comicsService.getEditComics(mediaId);
        break;
      }
      case MediaEnum.book: {
        res = await this.booksService.getEditBook(mediaId);
        break;
      }
    }

    this.logger.log('Get moder edit media (end)');
    return res;
  }

  public async embeddingSearch(
    dto: EmbeddingSearchInput,
    userId: string,
  ): Promise<Array<typeof MediaSearchType>> {
    this.logger.log('Embedding search (start)');
    let res: Array<typeof MediaSearchType>;
    const { message, mediaType, count } = dto;

    const { access } = await this.usersService.subtractToken({
      tokenCost: 2,
      userId: userId,
    });

    if (!access) {
      this.logger.warn('Embedding search error');
      throw new ForbiddenError('You have no tokens');
    }

    const embedding = await this.gptService.getEmbedding(message);

    if (!embedding.length) {
      this.logger.warn('Embedding search error');
      throw new InternalServerError('Search error');
    }

    switch (mediaType) {
      case MediaEnum.film: {
        res = await this.filmsService.embeddingSearchFilms(
          userId,
          count,
          embedding,
        );
        break;
      }
      case MediaEnum.series: {
        res = await this.seriesService.embeddingSearchSeries(
          userId,
          count,
          embedding,
        );
        break;
      }
      case MediaEnum.book: {
        res = await this.booksService.embeddingSearchBooks(
          userId,
          count,
          embedding,
        );
        break;
      }
      case MediaEnum.comics: {
        res = await this.comicsService.embeddingSearchComics(
          userId,
          count,
          embedding,
        );
        break;
      }
    }

    this.logger.log('Embedding search (end)');
    return res;
  }

  private createStringFromObject(inputObject: { [key: string]: any }): string {
    let result = '';
    for (const key in inputObject) {
      if (inputObject.hasOwnProperty(key)) {
        result += `${key}: ${inputObject[key]}.\n`;
      }
    }
    return result;
  }

  public async acceptModerMedia(
    moderId: string,
    dto: AcceptModerMediaInput,
  ): Promise<SuccessResponse> {
    this.logger.log('Accept moder media (start)');
    const { isPublic, oldImage, media, mediaId, mediaType, reportId } = dto;
    let embedding: number[] | null = null;
    let imageLink = media.image;

    if (reportId) {
      await this.reportsService.deleteReport(reportId);
    }

    if (oldImage) {
      this.logger.debug('Start update image');
      imageLink = await this.filesService.updateMediaImage(
        dto.mediaType,
        oldImage,
        media.image,
      );
    }

    if (isPublic) {
      embedding = await this.gptService.getEmbedding(
        this.createStringFromObject(media),
      );
    }

    switch (mediaType) {
      case MediaEnum.film: {
        await this.filmsService.updateFilm(moderId, imageLink, embedding, dto);
        break;
      }

      case MediaEnum.series: {
        await this.seriesService.updateSeries(
          moderId,
          imageLink,
          embedding,
          dto,
        );
        const addSeasons = dto.media.seasons
          .filter((season) => !season.id)
          .map((season) => {
            if (!season?.id) {
              const id = uuid.v4();
              return { ...season, id: id };
            }
          });

        await this.seriesSeasonsService.addSeriesSeasons(mediaId, addSeasons);

        await this.seriesSeasonsService.updateSeriesSeasons(
          mediaId,
          dto.media.seasons,
        );
        break;
      }
      case MediaEnum.comics: {
        await this.comicsService.updateComics(
          moderId,
          imageLink,
          embedding,
          dto,
        );
        break;
      }
      case MediaEnum.book: {
        await this.booksService.updateBook(moderId, imageLink, embedding, dto);
        break;
      }
    }
    this.logger.log('Accept moder media (end)');
    return { success: true };
  }

  public async getModerReportMedia(): Promise<MediaReportResponse> {
    this.logger.log('Get moder report media (start)');
    let res: MediaReportResponse;
    let filmCount: number;
    let seriesCount: number;
    let comicsCount: number;
    let bookCount: number;
    try {
      const getReportCountQuery = {
        text: `
        SELECT
          SUM(CASE WHEN "mediaType" = '${MediaEnum.film}' AND type = '${ReportEnum.media}' THEN 1 ELSE 0 END) AS "filmCount",
          SUM(CASE WHEN "mediaType" = '${MediaEnum.series}' AND type = '${ReportEnum.media}' THEN 1 ELSE 0 END) AS "seriesCount",
          SUM(CASE WHEN "mediaType" = '${MediaEnum.comics}' AND type = '${ReportEnum.media}' THEN 1 ELSE 0 END) AS "comicsCount",
          SUM(CASE WHEN "mediaType" = '${MediaEnum.book}' AND type = '${ReportEnum.media}' THEN 1 ELSE 0 END) AS "bookCount"
        FROM "reports";
         `,
      };

      this.logger.debug(`Executing query: (getReportCountQuery)`);
      const countRes = await this.db.query(getReportCountQuery);
      filmCount = Number(countRes.rows[0].filmCount);
      seriesCount = Number(countRes.rows[0].seriesCount);
      comicsCount = Number(countRes.rows[0].comicsCount);
      bookCount = Number(countRes.rows[0].bookCount);
    } catch (err) {
      this.logger.error('Get moder report media (error)', err);
      throw new InternalServerError('Get media report error');
    }

    if (filmCount > 0) {
      res = await this.filmsService.getReportFilm();
    } else if (seriesCount > 0) {
      const series = await this.seriesService.getReportSeries();

      const seriesSeason = await this.seriesSeasonsService.getSeriesSeasons(
        series.media.id,
      );
      res = {
        ...series,
        media: { ...series.media, seasons: [...seriesSeason] },
      };
    } else if (comicsCount > 0) {
      res = await this.comicsService.getReportComics();
    } else if (bookCount > 0) {
      res = await this.booksService.getReportBook();
    }

    if (res === undefined) {
      this.logger.warn('Get moder report media (error)');
      throw new NotFoundError('Not fount not checked media report');
    }

    this.logger.log('Get moder report media (end)');
    return res;
  }

  public async getModerMedia(): Promise<MediaModerResponse> {
    this.logger.log('Get moder media (start)');
    let res: MediaModerResponse;
    let filmCount: number;
    let seriesCount: number;
    let comicsCount: number;
    let bookCount: number;

    try {
      const getPrivateMediaCountQuery = {
        text: `
        SELECT
        (SELECT COUNT(*)
          FROM "films"
          WHERE "isChecked" = FALSE) AS "filmCount",
      
        (SELECT COUNT(*)
          FROM "series"
          WHERE "isChecked" = FALSE) AS "seriesCount",
      
        (SELECT COUNT(*)
          FROM "comics"
          WHERE "isChecked" = FALSE) AS "comicsCount",
      
        (SELECT COUNT(*)
          FROM "books"
          WHERE "isChecked" = FALSE) AS "bookCount";
         `,
      };

      this.logger.debug(`Executing query: (getPrivateMediaCountQuery)`);
      const countRes = await this.db.query(getPrivateMediaCountQuery);
      filmCount = Number(countRes.rows[0].filmCount);
      seriesCount = Number(countRes.rows[0].seriesCount);
      comicsCount = Number(countRes.rows[0].comicsCount);
      bookCount = Number(countRes.rows[0].bookCount);
    } catch (err) {
      this.logger.error('Get moder media count (error)', err);
      throw new InternalServerError('Get moder media error');
    }

    if (filmCount > 0) {
      res = await this.filmsService.getModerFilms();
    } else if (seriesCount > 0) {
      const series = await this.seriesService.getModerSeries();
      const seriesSeasonRes = await this.seriesSeasonsService.getSeriesSeasons(
        series.media.id,
      );
      res = {
        ...series,
        media: {
          ...series.media,
          seasons: [...seriesSeasonRes],
        },
      };
    } else if (comicsCount > 0) {
      res = await this.comicsService.getModerComics();
    } else if (bookCount > 0) {
      res = await this.booksService.getModerBooks();
    }

    if (res === undefined) {
      this.logger.warn('Get moder media (error)');
      throw new NotFoundError('Not fount not checked media');
    }

    this.logger.log('Get moder media (end)');

    return res;
  }

  public async getModerMediaCount(): Promise<GetModerMediaCountResponse> {
    this.logger.log('Get moder media count (start)');
    let mediaCount = 0;
    try {
      const getModerMediaCountQuery = {
        text: `
            SELECT COUNT(*) AS count
            FROM (
                SELECT "isChecked" FROM "films"
                UNION ALL
                SELECT "isChecked" FROM "books"
              UNION ALL
                SELECT "isChecked" FROM "series"
              UNION ALL
                SELECT "isChecked" FROM "comics"
            ) AS combined
            WHERE combined."isChecked" = false;
         `,
      };

      this.logger.debug(`Executing query: (getModerMediaCountQuery)`);
      const mediaRes = await this.db.query(getModerMediaCountQuery);
      mediaCount = Number(mediaRes.rows[0].count);
    } catch (err) {
      this.logger.error('Get moder media count (error)', err);
      throw new InternalServerError('Get moder media count error');
    }

    const reportsCount = await this.reportsService.getReportsCount();

    this.logger.log('Get moder media count (end)');
    return { mediaCount: mediaCount, reportsCount: reportsCount };
  }

  public async getGenres(
    userId: string,
    dto: GetGenresInput,
  ): Promise<GenresResponse> {
    this.logger.log('Get genres (start)');
    const {
      bookType,
      comicsType,
      filmType,
      inUserMedia,
      mediaType,
      seriesType,
    } = dto;
    let res;
    try {
      if (inUserMedia) {
        const getGenresQuery = {
          text: `
          WITH "CombinedGenres" AS (
            SELECT DISTINCT UNNEST(GENRES) as genres, id, type
            FROM ${
              mediaType === MediaEnum.film
                ? 'films'
                : mediaType === MediaEnum.series
                ? 'series'
                : mediaType === MediaEnum.comics
                ? 'comics'
                : 'books'
            }
        )
        SELECT ARRAY_AGG(DISTINCT cg.genres) AS genres
        FROM "CombinedGenres" cg
        LEFT JOIN "userMedia" UM ON cg."id" = UM."mediaId"
            AND UM."mediaType" = '${mediaType}'
            AND UM."userId" = $1
            AND UM."watched" = '${WatchedEnum.planned}'
         ${
           mediaType === MediaEnum.film && filmType
             ? `WHERE cg."type" = '${filmType}'`
             : mediaType === MediaEnum.series && seriesType
             ? `WHERE cg."type" = '${seriesType}'`
             : mediaType === MediaEnum.comics && comicsType
             ? `WHERE cg."type" = '${comicsType}'`
             : mediaType === MediaEnum.book && bookType
             ? `WHERE cg."type" = '${bookType}'`
             : ''
         }`,
          values: [userId],
        };

        this.logger.debug(`Executing query: (getGenresQuery)`);
        res = await this.db.query(getGenresQuery);
      } else {
        const getPublicGenresQuery = {
          text: `
          WITH "CombinedGenres" AS (
            SELECT DISTINCT UNNEST(GENRES) as genres, id, type
            FROM ${
              mediaType === MediaEnum.film
                ? 'films'
                : mediaType === MediaEnum.series
                ? 'series'
                : mediaType === MediaEnum.comics
                ? 'comics'
                : 'books'
            }
        )
        SELECT ARRAY_AGG(DISTINCT cg.genres) AS genres
        FROM "CombinedGenres" cg
        LEFT JOIN "userMedia" UM ON cg."id" = UM."mediaId"
            AND UM."mediaType" = '${mediaType}'
            AND UM."userId" = $1
            AND UM."watched" <> '${WatchedEnum.planned}'
        WHERE um."mediaId" IS NULL 
            ${
              mediaType === MediaEnum.film && filmType
                ? `AND cg."type" = '${filmType}'`
                : mediaType === MediaEnum.series && seriesType
                ? `AND cg."type" = '${seriesType}'`
                : mediaType === MediaEnum.comics && comicsType
                ? `AND cg."type" = '${comicsType}'`
                : mediaType === MediaEnum.book && bookType
                ? `AND cg."type" = '${bookType}'`
                : ''
            }`,
          values: [userId],
        };

        this.logger.debug(`Executing query: (getPublicGenresQuery)`);
        res = await this.db.query(getPublicGenresQuery);
      }
    } catch (err) {
      this.logger.error('Get genres (error)', err);
      throw new InternalServerError('Get genres error');
    }
    this.logger.log('Get genres (end)');
    return res.rows[0];
  }

  public async getRandomMedia(
    userId: string,
    dto: GetRandomMediaInput,
  ): Promise<Array<typeof MediaBaseType>> {
    this.logger.log('Get random media (start)');

    let res: Array<typeof MediaBaseType>;

    switch (dto.mediaType) {
      case MediaEnum.film: {
        res = await this.filmsService.getRandomFilms(userId, dto);
        break;
      }
      case MediaEnum.series: {
        res = await this.seriesService.getRandomSeries(userId, dto);
        break;
      }
      case MediaEnum.comics: {
        res = await this.comicsService.getRandomComics(userId, dto);
        break;
      }
      case MediaEnum.book: {
        res = await this.booksService.getRandomBooks(userId, dto);
        break;
      }
    }

    this.logger.log('Get random media (end)');
    return res;
  }

  public async getCollectionMedia(
    dto: GetUserMediaInput,
  ): Promise<Array<typeof GetMediaType>> {
    this.logger.log(`Get collection media (start)`);

    let res: Array<typeof GetMediaType>;

    switch (dto.mediaTYpe) {
      case MediaEnum.film: {
        res = await this.filmsService.getCollectionFilms(dto);
        break;
      }
      case MediaEnum.series: {
        res = await this.seriesService.getCollectionSeries(dto);
        break;
      }
      case MediaEnum.comics: {
        res = await this.comicsService.getCollectionComics(dto);
        break;
      }
      case MediaEnum.book: {
        res = await this.booksService.getCollectionBooks(dto);
        break;
      }
    }
    this.logger.log(`Get collection media (end)`);
    return res;
  }

  public async getMedia(dto: GetMediaInput): Promise<typeof GetMediaType> {
    this.logger.log('Get media (start)');
    const { mediaId, mediaType, followId, userId } = dto;

    if (!mediaId || !mediaType) {
      this.logger.warn('Get media (error)');
      throw new BadRequestError('Bad request');
    }

    let res: typeof GetMediaType;

    switch (mediaType) {
      case MediaEnum.film: {
        res = await this.filmsService.getFilm(userId, mediaId, followId);
        break;
      }
      case MediaEnum.series: {
        const seriesRes = await this.seriesService.getSeries(
          userId,
          mediaId,
          followId,
        );
        res = {
          ...seriesRes,
          seasons: seriesRes.seasons.sort((a, b) => a.season - b.season),
        };
        break;
      }
      case MediaEnum.comics: {
        res = await this.comicsService.getComics(userId, mediaId, followId);
        break;
      }
      case MediaEnum.book: {
        res = await this.booksService.getBook(userId, mediaId, followId);
        break;
      }
    }

    if (!res) {
      this.logger.warn('Not found media');
      throw new NotFoundError('Media not found');
    }

    this.logger.log('Get media (end)');
    return res;
  }

  public async searchMedia(
    userId: string,
    dto: SearchInput,
  ): Promise<Array<typeof MediaSearchType>> {
    this.logger.log('Search media (start)');
    const { mediaType, query } = dto;

    const newQuery = query.trim().split(' ').join(' & ');

    let res: Array<typeof MediaSearchType>;

    switch (mediaType) {
      case MediaEnum.film: {
        res = await this.filmsService.searchFilms(userId, newQuery);
        break;
      }
      case MediaEnum.series: {
        res = await this.seriesService.searchSeries(userId, newQuery);
        break;
      }
      case MediaEnum.book: {
        res = await this.booksService.searchBooks(userId, newQuery);
        break;
      }
      case MediaEnum.comics: {
        res = await this.comicsService.searchComics(userId, newQuery);
        break;
      }
    }
    this.logger.log('Search media (end)');
    return res;
  }

  public async createMedia(
    userId: string,
    dto: CreateMediaInput,
  ): Promise<SuccessResponse> {
    this.logger.log(`Create media (start)`);
    const { media } = dto;
    const mediaId = uuid.v4();

    if (!media.title) {
      this.logger.warn(`Create media (error)`);
      throw new BadRequestError(`Empty title`);
    }

    const imageLink = await this.filesService.createMediaImage(
      dto.mediaType,
      media.image,
    );

    switch (dto.mediaType) {
      case MediaEnum.film: {
        await this.filmsService.addFilm(userId, mediaId, imageLink, dto);
        break;
      }
      case MediaEnum.series: {
        const seasons = media.seasons
          ? media.seasons.map((season) => ({
              ...season,
              id: uuid.v4(),
            }))
          : [];

        await this.seriesService.addSeries(userId, mediaId, imageLink, dto);
        await this.seriesSeasonsService.addSeriesSeasons(mediaId, seasons);
        await this.userSeasonsService.addUserSeasons(userId, mediaId, seasons);
        break;
      }
      case MediaEnum.comics: {
        await this.comicsService.addComics(userId, mediaId, imageLink, dto);
        break;
      }
      case MediaEnum.book: {
        await this.booksService.addBook(userId, mediaId, imageLink, dto);
        break;
      }
    }

    await this.userMediaService.addMediaToUser(userId, {
      mediaId: mediaId,
      mediaType: dto.mediaType,
      note: dto.note,
      rate: dto.rate,
      watched: dto.watched,
    });

    this.logger.log('Create media (end)');
    return { success: true };
  }
}
