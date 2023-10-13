import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { WikiSearchService, ImagesService } from './services';
import {
  GptInput,
  ImagesInput,
  ImagesResponse,
  QueryInput,
  TitleResponse,
} from './dto';
import { Logger, UseGuards } from '@nestjs/common';
import { GptService } from './services/gpt.service';
import { MediaParseResponse } from './dto/mediaParse.response';
import { GqlAccessGuard } from 'src/auth/guards';
import { CurrentUser } from 'src/auth/decorators';
import { SuccessResponse, User } from 'src/shared/dto';

@Resolver()
export class ParseResolver {
  constructor(
    private gptService: GptService,
    private searchService: WikiSearchService,
    private imagesService: ImagesService,
  ) {}

  private readonly logger = new Logger(ParseResolver.name);

  // Title + year by description
  @UseGuards(GqlAccessGuard)
  @Query(() => TitleResponse)
  async gptTitleParse(
    @Args('queryInput') queryInput: QueryInput,
    @CurrentUser() user: User,
  ): Promise<TitleResponse> {
    this.logger.log('Searching title and year...');
    this.logger.verbose(
      `Media type: (${queryInput.mediaType}).
      Query: (${queryInput.query}).`,
    );
    const response = await this.gptService.gptTitleParse(user.id, queryInput);
    return response;
  }

  // Parse wiki by title
  @UseGuards(GqlAccessGuard)
  @Query((returns) => MediaParseResponse)
  async wikiMediaParse(
    @CurrentUser() user: User,
    @Args('queryInput') queryInput: QueryInput,
  ): Promise<MediaParseResponse> {
    this.logger.log('Wiki parse film by title...');
    this.logger.verbose(
      `Media type: (${queryInput.mediaType}). Query: (${queryInput.query})`,
    );
    const response = await this.searchService.wikiMediaParse(
      user.id,
      queryInput,
    );
    return response;
  }

  // Parse posters/covers
  @UseGuards(GqlAccessGuard)
  @Query(() => ImagesResponse)
  async imageParse(
    @CurrentUser() user: User,
    @Args('imagesInput') imagesInput: ImagesInput,
  ): Promise<ImagesResponse> {
    this.logger.log('Parsing images...');
    this.logger.verbose(
      `Media type: (${imagesInput.mediaType}). Count: (${imagesInput.count}). Query: (${imagesInput.query})`,
    );
    const response = await this.imagesService.ImageParse(user.id, imagesInput);
    return response;
  }

  // Parse GPT
  @UseGuards(GqlAccessGuard)
  @Query(() => MediaParseResponse)
  async gptMediaParse(
    @CurrentUser() user: User,
    @Args('gptInput') gptInput: GptInput,
  ): Promise<MediaParseResponse> {
    this.logger.log('Gpt parsing film...');
    const response = await this.gptService.gptMediaParse(user.id, gptInput);
    return response;
  }
}
