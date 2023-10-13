import { Module } from '@nestjs/common';
import { MediaResolver } from './media.resolver';
import { DbModule } from 'src/db/db.module';
import { MediaService } from './media.service';
import { FilesModule } from 'src/files/files.module';
import { ParseModule } from 'src/parse/parse.module';
import { UsersModule } from 'src/users/users.module';
import {
  BooksService,
  ComicsService,
  FilmsService,
  SeriesSeasonsService,
  SeriesService,
  UserSeasonsService,
} from './services';
import { UserMediaModule } from 'src/user-media/user-media.module';
import { ReportsModule } from 'src/reports/reports.module';

@Module({
  imports: [
    DbModule,
    FilesModule,
    ParseModule,
    UsersModule,
    UserMediaModule,
    ReportsModule,
  ],
  providers: [
    MediaResolver,
    MediaService,
    FilmsService,
    SeriesService,
    BooksService,
    ComicsService,
    SeriesSeasonsService,
    UserSeasonsService,
  ],
})
export class MediaModule {}
