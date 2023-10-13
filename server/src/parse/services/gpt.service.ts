import { Injectable, Logger } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { Promts } from '../constants';
import { UsersService } from 'src/users/users.service';
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
} from 'src/shared/errors';
import {
  GptInput,
  MediaParseResponse,
  QueryInput,
  TitleResponse,
} from '../dto';
import { MediaEnum } from 'src/shared/enums';
import {
  BookParseResponse,
  ComicsParseResponse,
  FilmParseResponse,
  SeriesParseResponse,
} from 'src/shared/dto';
import { ChatResponseType } from '../types';
import MediaParseType from '../types/mediaParseType';

@Injectable()
export class GptService {
  private readonly logger = new Logger(GptService.name);
  constructor(private readonly usersService: UsersService) {}

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

  // connect to GPT
  private createOpenAi() {
    this.logger.log('Create OpenAI instance');
    const configuration = new Configuration({
      apiKey: process.env.OPEN_AI_KEY,
    });
    const openAi = new OpenAIApi(configuration);
    return openAi;
  }

  public async getEmbedding(userMessage: string) {
    const openAi = this.createOpenAi();
    const completion = await openAi.createEmbedding({
      model: 'text-embedding-ada-002',
      input: userMessage,
    });
    const usage = completion.data.usage;
    const response = completion.data.data[0].embedding;
    this.logger.verbose(`Usage: ${usage.total_tokens} tokens`);
    return response;
  }

  // send message to GPT
  private async sendMessage(
    systemMessage: string,
    userMessage: string,
    temperature: number,
    max_tokens: number,
  ): Promise<ChatResponseType> {
    try {
      this.logger.log('Send message to OpenAI (start)');
      const openAi = this.createOpenAi();
      const completion = await openAi.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemMessage,
          },
          {
            role: 'user',
            content: userMessage,
          },
        ],
        temperature: temperature,
        max_tokens: max_tokens,
      });
      const usage = completion.data.usage;
      const response = completion.data.choices[0].message.content;

      this.logger.verbose(`Usage: ${usage.total_tokens} tokens`);
      this.logger.log('Send message to OpenAI (end)');
      return {
        usage: usage,
        response: response,
      };
    } catch (err) {
      this.logger.error('Send message to OpenAI error', err);
      throw new InternalServerError('Send message to OpenAI error');
    }
  }

  // convert response to json
  private convertToJson(response: string) {
    this.logger.log('Convert to json (start)');
    const regex = /[{].*[}]$/s;
    const jsonString = response.match(regex);
    if (!jsonString) {
      this.logger.verbose(
        `Input response: (${response}). Output response: (null)`,
      );
      return null;
    }
    const jsonResponse = JSON.parse(jsonString[0]);
    this.logger.verbose(
      `Input response: (${response}). Output response: (${jsonResponse})`,
    );
    this.logger.log('Convert to json (end)');
    return jsonResponse;
  }

  // Ues for Remember title (on site)
  // GPT parsing title and year by description
  public async gptTitleParse(
    userId: string,
    dto: QueryInput,
  ): Promise<TitleResponse> {
    this.logger.log(`Search title (start)`);
    // this.isNotEnglishError(dto.query);
    const { mediaType, query } = dto;
    const { access, additionalMediaTokens, mediaTokens } =
      await this.usersService.subtractToken({ userId: userId, tokenCost: 2 });
    if (!access) {
      this.logger.warn('Search title error');
      throw new ForbiddenError('You have no tokens');
    }

    const completion = await this.sendMessage(
      Promts.getSearchTitlePrompt(mediaType),
      query,
      0.5,
      100,
    );
    const jsonComletionResponse = this.convertToJson(completion.response);
    this.logger.log(`Search title (end)`);
    const res: TitleResponse = {
      additionalMediaTokens: additionalMediaTokens,
      mediaTokens: mediaTokens,
      title: jsonComletionResponse.title,
      year: jsonComletionResponse.year,
    };
    return res;
  }

  // Use for JSON parse (on site)
  // GPT fill in the fields with user information query
  private async parseToJson(
    mediaType: MediaEnum,
    userId: string,
    query: string,
  ): Promise<MediaParseResponse> {
    this.logger.log(`Parse to json ${mediaType} (start)`);
    this.isNotEnglishError(query);
    // Checks whether the user can pay for the service
    const tokenCost = 20;
    const { access, additionalMediaTokens, mediaTokens } =
      await this.usersService.subtractToken({
        userId: userId,
        tokenCost: tokenCost,
      });
    if (!access) {
      this.logger.warn(`Parse to json ${mediaType} error`);
      throw new ForbiddenError('You have no tokens');
    }

    let mediaStringPromts;
    switch (mediaType) {
      case MediaEnum.film:
        mediaStringPromts = Promts.FilmJsonPromts;
        break;
      case MediaEnum.series:
        mediaStringPromts = Promts.SeriesJsonPromt;
        break;
      case MediaEnum.comics:
        mediaStringPromts = Promts.ComicsJsonPromts;
        break;
      case MediaEnum.book:
        mediaStringPromts = Promts.BookJsonPromts;
        break;
    }

    const completion = await this.sendMessage(
      Promts.StartJSONPromt + mediaStringPromts,
      query,
      1,
      800,
    );

    const jsonComletionResponse: typeof MediaParseType = this.convertToJson(
      completion.response,
    );

    const res: MediaParseResponse = {
      additionalMediaTokens: additionalMediaTokens,
      mediaTokens: mediaTokens,
      media: jsonComletionResponse,
    } as MediaParseResponse;

    this.logger.log(`Parse to json ${mediaType} (end)`);
    return res;
  }

  // Use with WIKI parse (on site) when media was created after 2021 to to simplify the wiki text
  // GPT fill in the PLOT/DESCRIPTION field by user information query
  private async parsePlot(
    mediaType: MediaEnum,
    userId: string,
    query: string,
  ): Promise<MediaParseResponse> {
    this.logger.log(`Parse ${mediaType} plot (start)`);

    // Checks whether the user can pay for the service
    const tokenCost = 2;
    const { access, additionalMediaTokens, mediaTokens } =
      await this.usersService.subtractToken({
        userId: userId,
        tokenCost: tokenCost,
      });
    if (!access) {
      this.logger.warn(`Parse ${mediaType} plot error`);
      throw new ForbiddenError('You have no tokens');
    }

    const completion = await this.sendMessage(
      Promts.getPlotPromt(mediaType),
      query,
      1.5,
      200,
    );
    let media: typeof MediaParseType;
    switch (mediaType) {
      case MediaEnum.film:
      case MediaEnum.series:
        (media as FilmParseResponse | SeriesParseResponse) = {
          plot: completion.response,
        };
        break;
      case MediaEnum.book:
      case MediaEnum.comics:
        (media as BookParseResponse | ComicsParseResponse) = {
          description: completion.response,
        };
        break;
    }
    const res = {
      additionalMediaTokens: additionalMediaTokens,
      mediaTokens: mediaTokens,
      media: media,
    } as MediaParseResponse;

    this.logger.log(`Parse ${mediaType} plot (end)`);
    return res;
  }

  // build messages for gpt parseFields
  private buildMessages(
    workPromts: any,
    query: string,
    inputKeys: string[],
    isAllFields: boolean,
    type: MediaEnum,
  ): { systemMessage1: string; systemMessage2: string; userMessage: string } {
    this.logger.log('Build messages (start)');
    this.logger.verbose(`Is all fields: ${isAllFields}. Keys: (${inputKeys})`);

    // SystemMessage1 - plot, genres, tags
    // SystemMessage2 - all others
    const promtsArray1 = [];
    const promtsArray2 = [];

    promtsArray1.push(Promts.StartParsePromt);
    promtsArray2.push(Promts.StartParsePromt);
    if (type === MediaEnum.book || type === MediaEnum.comics) {
      promtsArray1.push(workPromts.description);
    } else {
      promtsArray1.push(workPromts.plot);
    }

    promtsArray1.push(workPromts.genres);
    promtsArray1.push(workPromts.tags);
    if (isAllFields) {
      Object.keys(workPromts).forEach((key) => {
        if (
          key !== 'plot' &&
          key !== 'description' &&
          key !== 'genres' &&
          key !== 'image' &&
          key !== 'tags'
        ) {
          promtsArray2.push(workPromts[key]);
        }
      });
    } else {
      Object.keys(workPromts).forEach((key) => {
        if (
          inputKeys.includes(key) &&
          key !== 'plot' &&
          key !== 'description' &&
          key !== 'genres' &&
          key !== 'image' &&
          key !== 'tags'
        ) {
          promtsArray2.push(workPromts[key]);
        }
      });
    }

    const systemMessage1 = promtsArray1.join('\n');
    const systemMessage2 = promtsArray2.join('\n');
    const userMessage = query;

    this.logger.verbose(
      `User message: (${userMessage}). System message 1: (${systemMessage1}). System message 2: (${systemMessage2}).`,
    );

    this.logger.log('Build messages (end)');
    return { systemMessage1, systemMessage2, userMessage };
  }

  // Use in GPT parse and with Wiki parse when media was created before 2021
  // GPT fill in empty fields
  private async parseFields(
    mediaType: MediaEnum,
    userId: string,
    query: string,
    keys: string[],
    isAllFields: boolean,
  ): Promise<MediaParseResponse> {
    this.logger.log(`Parse ${mediaType} fields (start)`);

    // Checks whether the user can pay for the service
    const tokenCost = isAllFields ? 8 : 4;
    const { access, additionalMediaTokens, mediaTokens } =
      await this.usersService.subtractToken({
        userId: userId,
        tokenCost: tokenCost,
      });
    if (!access) {
      this.logger.warn(`Parse ${mediaType} fields error`);
      throw new ForbiddenError('You have no tokens');
    }
    let workPromts;
    switch (mediaType) {
      case MediaEnum.film: {
        workPromts = Promts.FilmPromts;
        break;
      }
      case MediaEnum.series: {
        workPromts = Promts.SeriesPromts;
        break;
      }
      case MediaEnum.book: {
        workPromts = Promts.BookPromts;
        break;
      }
      case MediaEnum.comics: {
        workPromts = Promts.ComicsPromts;
        break;
      }
    }
    const { systemMessage1, systemMessage2, userMessage } = this.buildMessages(
      workPromts,
      query,
      keys,
      isAllFields,
      mediaType,
    );
    // SystemMessage1 - plot, genres, tags
    // SystemMessage2 - all others
    const completion1 = await this.sendMessage(
      systemMessage1,
      userMessage,
      1,
      300,
    );
    const jsonComletion1Response = this.convertToJson(completion1.response);
    let media1: typeof MediaParseType;

    if (jsonComletion1Response) {
      media1 = jsonComletion1Response;
    }

    if (systemMessage2 === Promts.StartParsePromt) {
      this.logger.log(`Parse ${mediaType} fields (end)`);

      return {
        media: media1,
        additionalMediaTokens: additionalMediaTokens,
        mediaTokens: mediaTokens,
      } as MediaParseResponse;
    }

    const completion2 = await this.sendMessage(
      systemMessage2,
      userMessage,
      1,
      500,
    );
    const jsonComletion2Response = this.convertToJson(completion2.response);
    let media2: typeof MediaParseType;
    if (jsonComletion2Response) {
      media2 = jsonComletion2Response;
    }

    if (jsonComletion2Response && jsonComletion1Response) {
      switch (mediaType) {
        case MediaEnum.film:
        case MediaEnum.series:
          (media2 as FilmParseResponse | SeriesParseResponse).plot = (
            media1 as FilmParseResponse | SeriesParseResponse
          ).plot;
          break;
        case MediaEnum.book:
        case MediaEnum.comics:
          (media2 as BookParseResponse | ComicsParseResponse).description = (
            media1 as BookParseResponse | ComicsParseResponse
          ).description;
          break;
      }
      media2.genres = media1.genres;
      media2.tags = media1.tags;
    }

    this.logger.log(`Parse ${mediaType} fields (end)`);
    return {
      media: media2,
      additionalMediaTokens: additionalMediaTokens,
      mediaTokens: mediaTokens,
    } as MediaParseResponse;
  }

  public async gptMediaParse(
    userId: string,
    dto: GptInput,
  ): Promise<MediaParseResponse> {
    const { isAfter2021, isAllFields, isJson, keys, query, mediaType } = dto;

    this.logger.log(`Parse ${mediaType} (start)`);

    let res: MediaParseResponse;
    if (isJson) {
      res = await this.parseToJson(mediaType, userId, query);
    } else if (isAfter2021) {
      res = await this.parsePlot(mediaType, userId, query);
    } else {
      res = await this.parseFields(mediaType, userId, query, keys, isAllFields);
    }
    this.logger.log(`Parse ${mediaType} (start)`);
    return { ...res, media: { ...res.media, media: mediaType } };
  }
}
