import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ParseModule } from './parse/parse.module';
import { ScheduleModule } from '@nestjs/schedule';
import { FilesModule } from './files/files.module';
import { MediaModule } from './media/media.module';
import { NotificationsModule } from './notifications/notifications.module';
import { FollowsModule } from './follows/follows.module';
import { UserMediaModule } from './user-media/user-media.module';
import { ReportsModule } from './reports/reports.module';
import { DateScalar } from './shared/date.scalar';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  providers: [DateScalar],
  imports: [
    ScheduleModule.forRoot(),
    // ServeStaticModule.forRoot({
    //   rootPath: join(process.cwd(), '..', 'client', 'dist'),
    // }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      playground: false,
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    DbModule,
    UsersModule,
    AuthModule,
    ParseModule,
    FilesModule,
    MediaModule,
    NotificationsModule,
    FollowsModule,
    UserMediaModule,
    ReportsModule,
  ],
})
export class AppModule {}
