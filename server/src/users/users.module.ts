import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { DbModule } from 'src/db/db.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { UsersResolver } from './users.resolver';
import { UserMediaModule } from 'src/user-media/user-media.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    DbModule,
    NotificationsModule,
    UserMediaModule,
    forwardRef(() => FilesModule),
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
