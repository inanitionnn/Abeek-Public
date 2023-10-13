import { Injectable, Logger } from '@nestjs/common';

import { WikiService } from './wiki.service';
import axios from 'axios';
import cheerio from 'cheerio';
import { UsersService } from 'src/users/users.service';
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from 'src/shared/errors';
import { MediaEnum } from 'src/shared/enums';
import { QueryInput } from '../dto';
import { MediaParseResponse } from '../dto/mediaParse.response';
import MediaParseType from '../types/mediaParseType';

@Injectable()
export class WikiSearchService {
  constructor(
    private wikiService: WikiService,
    private usersService: UsersService,
  ) {}

  private readonly logger = new Logger(WikiSearchService.name);

  // Throw error if query is not english
  private isNotEnglishError(input: string): void {
    const notEnglishRegex = /[^\u0000-\u007F…–‘’“”]/;
    const isNotEnglish = notEnglishRegex.test(input);
    if (isNotEnglish) {
      this.logger.warn('Not english input');
      this.logger.debug(`Invalid input: (${input})`);
      throw new BadRequestError('Please use English');
    }
  }

  // Check is link
  private isLink(input: string): boolean {
    const linkRegex = /^(http|https):\/\/[^ "]+$/;
    return linkRegex.test(input);
  }

  // Throw error if query is not english wiki link
  private isEnglishWikipediaLinkError(input: string): void {
    const linkRegex = /^(http|https):\/\/en\.wikipedia\.org\/wiki\/[^ "]+$/;
    if (!linkRegex.test(input)) {
      this.logger.warn('Not English Wikipedia link input');
      this.logger.debug(`Invalid input: (${input})`);
      throw new BadRequestError(
        'Please provide a link to the English Wikipedia',
      );
    }
  }

  // Takes the first link from the Wikipedia search results
  private async searchLink(query: string): Promise<string> {
    this.logger.log(`Search wiki link (start)`);
    const url = `https://en.wikipedia.org/w/index.php?title=Special:Search&limit=20&offset=0&ns0=1&search=${encodeURIComponent(
      query,
    )}`;
    try {
      const response = await axios.get(url);

      if (response.status !== 200) {
        this.logger.error(
          'Parse error: Unexpected response status',
          response.status,
        );
        throw new InternalServerError('Parse error');
      }

      const body = await response.data;
      const $ = cheerio.load(body);
      const $listItems = $('ul.mw-search-results li');
      const $element = $($listItems[0]);
      // const resultName = $element.find('a').text();
      const resultUrl = $element.find('a').attr('href');
      if (!resultUrl) {
        this.logger.warn('Not found wiki url');
        throw new NotFoundError('Not found wiki url');
      }
      const fullUrl = `https://en.wikipedia.org${resultUrl}`;
      this.logger.verbose(`Found link: (${fullUrl})`);
      this.logger.log(`Search wiki link (end)`);
      return fullUrl;
    } catch (err) {
      this.logger.error('Parse error', err);
      throw new InternalServerError('Parse error');
    }
  }

  public async wikiMediaParse(
    userId: string,
    dto: QueryInput,
  ): Promise<MediaParseResponse> {
    const { mediaType, query } = dto;
    this.logger.log(`Search wiki ${mediaType} by title (start)`);

    // Checks whether the user can pay for the service
    const { access, additionalMediaTokens, mediaTokens } =
      await this.usersService.subtractToken({ userId: userId, tokenCost: 1 });
    if (!access) {
      this.logger.warn(`Search wiki ${mediaType} by title error`);
      throw new ForbiddenError('You have no tokens');
    }

    let wikiParse: typeof MediaParseType;
    switch (mediaType) {
      case MediaEnum.film:
        if (this.isLink(query)) {
          this.isEnglishWikipediaLinkError(query);
          wikiParse = await this.wikiService.filmParse(query);
        } else {
          this.isNotEnglishError(query);
          const link = await this.searchLink('film ' + query);
          wikiParse = await this.wikiService.filmParse(link);
        }
        break;
      case MediaEnum.series:
        if (this.isLink(query)) {
          this.isEnglishWikipediaLinkError(query);
          wikiParse = await this.wikiService.seriesParse(query);
        } else {
          this.isNotEnglishError(query);
          const link = await this.searchLink('series ' + query);
          wikiParse = await this.wikiService.seriesParse(link);
        }
        break;
      case MediaEnum.book:
        if (this.isLink(query)) {
          this.isEnglishWikipediaLinkError(query);
          wikiParse = await this.wikiService.bookParse(query);
        } else {
          this.isNotEnglishError(query);
          const link = await this.searchLink('book ' + query);
          wikiParse = await this.wikiService.bookParse(link);
        }
        break;
      case MediaEnum.comics:
        if (this.isLink(query)) {
          this.isEnglishWikipediaLinkError(query);
          wikiParse = await this.wikiService.comicsParse(query);
        } else {
          this.isNotEnglishError(query);
          const link = await this.searchLink('comic ' + query);
          wikiParse = await this.wikiService.comicsParse(link);
        }
        break;
    }

    const res = {
      additionalMediaTokens: additionalMediaTokens,
      media: wikiParse,
      mediaTokens: mediaTokens,
    };
    this.logger.log(`Search wiki ${mediaType} by title (end)`);
    return res;
  }
}
