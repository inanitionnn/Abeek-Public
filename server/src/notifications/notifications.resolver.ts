import { Logger, UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotificationsService } from './notifications.service';
import { GqlAccessGuard } from 'src/auth/guards';
import { SuccessResponse, User } from 'src/shared/dto';
import { CurrentUser } from 'src/auth/decorators';
import { NotificationResponse } from './dto';

@Resolver()
export class NotificationsResolver {
  constructor(private notificationsService: NotificationsService) {}

  private readonly logger = new Logger(NotificationsResolver.name);

  @UseGuards(GqlAccessGuard)
  @Mutation((returns) => SuccessResponse)
  async setAllWatchedNotifications(
    @CurrentUser() user: User,
  ): Promise<SuccessResponse> {
    this.logger.log('Set all watched notifications...');
    const res = await this.notificationsService.setAllNotificationWatched(
      user.id,
    );
    return res;
  }

  @UseGuards(GqlAccessGuard)
  @Query((returns) => [NotificationResponse])
  async getUserNotifications(
    @CurrentUser() user: User,
  ): Promise<NotificationResponse[]> {
    this.logger.log('Get notifications...');
    const res = await this.notificationsService.getNotifications(user.id);
    return res;
  }
}
