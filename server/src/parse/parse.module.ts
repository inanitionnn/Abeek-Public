import { Module } from '@nestjs/common';
import { ParseResolver } from './parse.resolver';
import { GptService, WikiSearchService, WikiService } from './services';
import { ImagesService } from './services/images.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [
    ParseResolver,
    GptService,
    WikiService,
    WikiSearchService,
    ImagesService,
  ],
  exports: [GptService],
})
export class ParseModule {}
