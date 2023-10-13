import { Logger, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserMediaService } from './user-media.service';
import { GqlAccessGuard } from 'src/auth/guards';
import { SuccessResponse, User } from 'src/shared/dto';
import { CurrentUser } from 'src/auth/decorators';
import { AddMediaInput, UpdateUserMediaInput } from './dto';

@Resolver()
export class UserMediaResolver {
  constructor(private userMediaService: UserMediaService) {}

  private readonly logger = new Logger(UserMediaResolver.name);

  @UseGuards(GqlAccessGuard)
  @Mutation((returns) => SuccessResponse)
  async addMediaToUser(
    @CurrentUser() user: User,
    @Args('addMediaInput') addMediaInput: AddMediaInput,
  ): Promise<SuccessResponse> {
    this.logger.log('Searching media...');
    this.logger.verbose(
      `Media type: (${addMediaInput.mediaType}). 
      Media id: (${addMediaInput.mediaId}). `,
    );

    return await this.userMediaService.addMediaToUser(user.id, addMediaInput);
  }
}
