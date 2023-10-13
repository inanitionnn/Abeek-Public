import { Module } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { FollowsResolver } from './follows.resolver';
import { DbModule } from 'src/db/db.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [DbModule, NotificationsModule],
  exports: [FollowsService],
  providers: [FollowsService, FollowsResolver],
})
export class FollowsModule {}
