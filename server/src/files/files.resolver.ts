import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { FilesService } from './files.service';
import { Logger } from '@nestjs/common';
import { ImageResponse } from './dto';
import { FoldersEnum } from 'src/shared/enums';
import { Cron, CronExpression } from '@nestjs/schedule';

@Resolver('files')
export class FilesResolver {
  constructor(private filesService: FilesService) {}
  private readonly logger = new Logger(FilesResolver.name);

  @Cron('0 4 */3 * *')
  async deleteOldFiles() {
    this.logger.log('Delete old files');
    await this.filesService.deleteOldFiles(FoldersEnum.trashCan);
  }

  @Query((returns) => ImageResponse)
  async downloadFileByLink(@Args('url') url: string): Promise<ImageResponse> {
    const filePath = await this.filesService.downloadFile(
      url,
      FoldersEnum.trashCan,
      900,
      600,
    );
    return { link: filePath };
  }
}
