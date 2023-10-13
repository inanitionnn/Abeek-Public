import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FollowsService } from './follows.service';
import { Logger, UseGuards } from '@nestjs/common';
import { FollowResponse, GetFollowInput, getFollowInfoResponse } from './dto';
import { SuccessResponse, User } from 'src/shared/dto';
import { GqlAccessGuard } from 'src/auth/guards';
import { CurrentUser } from 'src/auth/decorators';

@Resolver()
export class FollowsResolver {
  constructor(private followsService: FollowsService) {}

  private readonly logger = new Logger(FollowsResolver.name);

  @UseGuards(GqlAccessGuard)
  @Query((returns) => [FollowResponse])
  async getUserFollowers(@CurrentUser() user: User): Promise<FollowResponse[]> {
    this.logger.log('Get user followers...');
    const res = await this.followsService.getUserFollowers(user.id);
    return res;
  }

  @UseGuards(GqlAccessGuard)
  @Query((returns) => [FollowResponse])
  async getUserFollows(@CurrentUser() user: User): Promise<FollowResponse[]> {
    this.logger.log('Get user follows...');
    const res = await this.followsService.getUserFollows(user.id);
    return res;
  }

  @Query((returns) => getFollowInfoResponse)
  async getFollowInfo(
    @Args('getFollowInput') getFollowInput: GetFollowInput,
  ): Promise<getFollowInfoResponse> {
    this.logger.log('Get follow public info...');
    const res = await this.followsService.getFollowInfo(getFollowInput);
    return res;
  }

  @UseGuards(GqlAccessGuard)
  @Mutation((returns) => SuccessResponse)
  async addFollow(
    @CurrentUser() user: User,
    @Args('followId') followId: string,
  ): Promise<SuccessResponse> {
    this.logger.log('Add folllow...');
    const res = await this.followsService.addFollow(user.id, followId);
    return res;
  }

  @UseGuards(GqlAccessGuard)
  @Mutation((returns) => SuccessResponse)
  async removeFollow(
    @CurrentUser() user: User,
    @Args('followId') followId: string,
  ): Promise<SuccessResponse> {
    this.logger.log('Remove folllow...');
    const res = await this.followsService.removeFollow(user.id, followId);
    return res;
  }
}
