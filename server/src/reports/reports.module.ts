import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsResolver } from './reports.resolver';
import { DbModule } from 'src/db/db.module';
import { UsersModule } from 'src/users/users.module';
import { UserMediaModule } from 'src/user-media/user-media.module';

@Module({
  imports: [DbModule, UsersModule, UserMediaModule],
  exports: [ReportsService],
  providers: [ReportsService, ReportsResolver],
})
export class ReportsModule {}
