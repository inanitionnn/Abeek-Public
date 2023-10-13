import { Module } from '@nestjs/common';
import { UserMediaService } from './user-media.service';
import { UserMediaResolver } from './user-media.resolver';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  exports: [UserMediaService],
  providers: [UserMediaService, UserMediaResolver],
})
export class UserMediaModule {}
