import {
  Controller,
  Get,
  Logger,
  Param,
  Res,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Response } from 'express';
import { FilesService } from './files.service';
import path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { FoldersEnum } from 'src/shared/enums';

@Controller('public')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}
  private readonly logger = new Logger(FilesController.name);

  @Get(':folder/:filename')
  async getImage(
    @Param('folder') folder: string,
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    this.logger.log('Photo static');
    const readStream = await this.fileService.static(filename, folder);
    // const basePath = path.resolve(process.cwd(), '..', 'public');
    // const imagePath = path.join(basePath, folder, filename);
    readStream.pipe(res);
    // return res.sendFile(imagePath);
  }

  @UseGuards(AuthGuard('access'))
  @Post('upload/cover')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: path.join(process.cwd(), '..', 'public', FoldersEnum.trashCan),
    }),
  )
  async uploadCover(@UploadedFile() file: Express.Multer.File) {
    const filePath = await this.fileService.createFile(
      file.filename,
      FoldersEnum.trashCan,
      900,
      600,
    );
    return filePath;
  }

  @UseGuards(AuthGuard('access'))
  @Post('upload/avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: path.join(process.cwd(), '..', 'public', FoldersEnum.users),
    }),
  )
  async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Req() req) {
    const userId = req.user.id;
    const filePath = await this.fileService.updateUserMedia(
      userId,
      file.filename,
    );
    return filePath;
  }
}
