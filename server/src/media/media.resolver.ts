import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Logger, UseGuards } from '@nestjs/common';
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
  MediaModerResponse,
  MediaReportResponse,
} from './dto';
import { MediaService } from './media.service';
import { ProfileInfoReponse, SuccessResponse, User } from 'src/shared/dto';
import { SearchInput } from './dto/search.input';
import {
  GetMediaType,
  MediaBaseType,
  MediaModerType,
  MediaSearchType,
} from './types';
import { RolesEnum } from 'src/shared/enums';
import { GqlAccessGuard, RolesGuard } from 'src/auth/guards';
import { CurrentUser, Roles } from 'src/auth/decorators';
import { UpdateUserMediaInput } from 'src/user-media/dto';

@Resolver()
export class MediaResolver {
  constructor(private mediaService: MediaService) {}

  private readonly logger = new Logger(MediaResolver.name);

  @UseGuards(GqlAccessGuard)
  @Mutation((returns) => SuccessResponse, { nullable: true })
  async updateUserMedia(
    @CurrentUser() user: User,
    @Args('updateUserMediaInput') updateUserMediaInput: UpdateUserMediaInput,
  ): Promise<SuccessResponse> {
    this.logger.log('Update user media...');
    this.logger.verbose(
      `Rate: (${updateUserMediaInput.rate}).
      Watched: (${updateUserMediaInput.watched}).
      Note: (${updateUserMediaInput.note}). `,
    );
    const res = await this.mediaService.updateUserMedia(
      user.id,
      updateUserMediaInput,
    );
    return res;
  }

  @UseGuards(GqlAccessGuard)
  @Query((returns) => ProfileInfoReponse)
  async getProfileInfo(@CurrentUser() user: User): Promise<ProfileInfoReponse> {
    this.logger.log('Get profile info...');
    const res = await this.mediaService.getProfileInfo(user.id);
    return res;
  }

  @UseGuards(GqlAccessGuard)
  @Query((returns) => [MediaSearchType], { nullable: true })
  async getNearMedia(
    @CurrentUser() user: User,
    @Args('getNearestMediaInput')
    getNearestMediaInput: GetNearestMediaInput,
  ): Promise<Array<typeof MediaSearchType>> {
    this.logger.log('Get nearest media...');

    const res = await this.mediaService.getNearMedia(
      getNearestMediaInput,
      user.id,
    );
    return res;
  }

  @UseGuards(GqlAccessGuard)
  @Query((returns) => [MediaSearchType], { nullable: true })
  async embeddingSearch(
    @CurrentUser() user: User,
    @Args('embeddingSearchInput') embeddingSearchInput: EmbeddingSearchInput,
  ): Promise<Array<typeof MediaSearchType>> {
    this.logger.log('Embedding search...');

    const res = await this.mediaService.embeddingSearch(
      embeddingSearchInput,
      user.id,
    );
    return res;
  }

  @UseGuards(GqlAccessGuard)
  @Query((returns) => [MediaFollowResponse], { nullable: true })
  async getFollowsMedia(
    @CurrentUser() user: User,
    @Args('getFollowsMediaInput')
    getFollowsMediaInput: GetFollowsMediaInput,
  ): Promise<Array<MediaFollowResponse>> {
    this.logger.log('Get follows media...');

    const res = await this.mediaService.getFollowsMedia(
      user.id,
      getFollowsMediaInput,
    );

    res.map((obj) => {
      return {
        ...obj,
        userMedia: {
          ...obj.userMedia,
          updatedAt: new Date(obj.userMedia.updatedAt),
        },
      };
    });
    console.log(res.map((obj) => obj.userMedia.updatedAt));
    return res;
  }

  @UseGuards(GqlAccessGuard)
  @Mutation((returns) => SuccessResponse, { nullable: true })
  async deleteMediaFromCollection(
    @CurrentUser() user: User,
    @Args('mediaId') mediaId: string,
  ): Promise<SuccessResponse> {
    this.logger.log('Accept moder media media...');

    const res = await this.mediaService.deleteMediaFromCollection(
      user.id,
      mediaId,
    );
    return res;
  }

  @UseGuards(RolesGuard)
  @Roles(RolesEnum.Moder, RolesEnum.Admin)
  @UseGuards(GqlAccessGuard)
  @Mutation((returns) => SuccessResponse, { nullable: true })
  async acceptModerMedia(
    @CurrentUser() user: User,
    @Args('acceptModerMediaInput') acceptModerMediaInput: AcceptModerMediaInput,
  ): Promise<SuccessResponse> {
    this.logger.log('Accept moder media media...');

    const res = await this.mediaService.acceptModerMedia(
      user.id,
      acceptModerMediaInput,
    );
    return res;
  }

  @UseGuards(RolesGuard)
  @Roles(RolesEnum.Moder, RolesEnum.Admin)
  @UseGuards(GqlAccessGuard)
  @Query((returns) => MediaModerType, { nullable: true })
  async getModerEditMedia(
    @Args('getModerEditMediaInput')
    getModerEditMediaInput: GetModerEditMediaInput,
  ): Promise<typeof MediaModerType> {
    this.logger.log('Get moder edit media...');

    const res = await this.mediaService.getModerEditMedia(
      getModerEditMediaInput,
    );
    return res;
  }

  @UseGuards(RolesGuard)
  @Roles(RolesEnum.Moder, RolesEnum.Admin)
  @UseGuards(GqlAccessGuard)
  @Query((returns) => MediaModerResponse, { nullable: true })
  async getModerMedia(): Promise<MediaModerResponse> {
    this.logger.log('Get moder media...');

    const res = await this.mediaService.getModerMedia();
    return res;
  }

  @UseGuards(RolesGuard)
  @Roles(RolesEnum.Moder, RolesEnum.Admin)
  @UseGuards(GqlAccessGuard)
  @Query((returns) => MediaReportResponse, { nullable: true })
  async getModerReportMedia(): Promise<MediaReportResponse> {
    this.logger.log('Get moder reports...');

    const res = await this.mediaService.getModerReportMedia();
    return res;
  }

  @UseGuards(RolesGuard)
  @Roles(RolesEnum.Moder, RolesEnum.Admin)
  @UseGuards(GqlAccessGuard)
  @Query((returns) => GetModerMediaCountResponse, { nullable: true })
  async getModerMediaCount(): Promise<GetModerMediaCountResponse> {
    this.logger.log('Get moder media count...');

    const res = await this.mediaService.getModerMediaCount();
    return res;
  }

  @UseGuards(GqlAccessGuard)
  @Query((returns) => GenresResponse, { nullable: true })
  async getGenres(
    @CurrentUser() user: User,
    @Args('getGenresInput') getGenresInput: GetGenresInput,
  ): Promise<GenresResponse> {
    this.logger.log('Get genres...');
    this.logger.verbose(
      `In user media: (${getGenresInput.inUserMedia}).
      Media type: (${getGenresInput.mediaType}). `,
    );
    const res = await this.mediaService.getGenres(user.id, getGenresInput);
    return res;
  }

  @UseGuards(GqlAccessGuard)
  @Query((returns) => [MediaBaseType], { nullable: true })
  async getRandomMedia(
    @CurrentUser() user: User,
    @Args('getRandomMediaInput') getRandomMediaInput: GetRandomMediaInput,
  ): Promise<Array<typeof MediaBaseType>> {
    this.logger.log('Get random media...');
    this.logger.verbose(
      `In user media: (${getRandomMediaInput.InUserMedia}). 
      Media type: (${getRandomMediaInput.mediaType}).`,
    );
    const res = await this.mediaService.getRandomMedia(
      user.id,
      getRandomMediaInput,
    );
    return res;
  }

  @Query((returns) => [GetMediaType], { nullable: true })
  async getUserMedia(
    @Args('getUserMediaInput') getUserMediaInput: GetUserMediaInput,
  ): Promise<Array<typeof GetMediaType>> {
    this.logger.log('Get user media...');
    this.logger.verbose(
      `Page: (${getUserMediaInput.page}). 
      Media type: (${getUserMediaInput.mediaTYpe}). 
      Sorted: (${getUserMediaInput.sorted}). 
      Watched: (${getUserMediaInput.watched}).`,
    );
    const res = await this.mediaService.getCollectionMedia(getUserMediaInput);
    // console.log(res);
    return res;
  }

  @Query((returns) => GetMediaType)
  async getMedia(
    @Args('getMediaInput') getMediaInput: GetMediaInput,
  ): Promise<typeof GetMediaType> {
    this.logger.log('Getting film media...');
    const res = await this.mediaService.getMedia(getMediaInput);
    return res;
  }

  @UseGuards(GqlAccessGuard)
  @Query((returns) => [MediaSearchType], { nullable: true })
  async searchMedia(
    @CurrentUser() user: User,
    @Args('searchInput') searchInput: SearchInput,
  ): Promise<Array<typeof MediaSearchType>> {
    this.logger.log('Searching media...');
    const res = await this.mediaService.searchMedia(user.id, searchInput);
    return res;
  }

  @UseGuards(GqlAccessGuard)
  @Mutation((returns) => SuccessResponse)
  async createMedia(
    @CurrentUser() user: User,
    @Args('createMediaInput') createMediaInput: CreateMediaInput,
  ): Promise<SuccessResponse> {
    this.logger.log('Creating film...');
    const res = await this.mediaService.createMedia(user.id, createMediaInput);
    return res;
  }
}
