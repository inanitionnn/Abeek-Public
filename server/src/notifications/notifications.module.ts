import { Module } from '@nestjs/common';
import { NotificationsResolver } from './notifications.resolver';
import { NotificationsService } from './notifications.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  exports: [NotificationsService],
  providers: [NotificationsResolver, NotificationsService],
})
export class NotificationsModule {}
