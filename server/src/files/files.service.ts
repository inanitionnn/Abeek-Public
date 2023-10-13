import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import path from 'path';
import fs from 'fs';
import * as uuid from 'uuid';
import download from 'image-downloader';
import sharp from 'sharp';
import * as dotenv from 'dotenv';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from 'src/shared/errors';
import { FoldersEnum, MediaEnum } from 'src/shared/enums';
import { UsersService } from 'src/users/users.service';
import NodeClam from 'clamscan';
dotenv.config();

// virus check ClamScan options
const options = {
  removeInfected: false, // If true, removes infected files
  quarantineInfected: false, // False: Don't quarantine, Path: Moves files to this place.
  scanLog: null, // Path to a writeable log file to write scan results into
  debugMode: false, // Whether or not to log info/debug/error msgs to the console
  fileList: null, // path to file containing list of files to scan (for scanFiles method)
  scanRecursively: true, // If true, deep scan folders recursively
  clamscan: {
    path: '/usr/bin/clamscan', // Path to clamscan binary on your server
    db: null, // Path to a custom virus definition database
    scanArchives: true, // If true, scan archives (ex. zip, rar, tar, dmg, iso, etc...)
    active: false, // If true, this module will consider using the clamscan binary
  },
  clamdscan: {
    socket: false, // Socket file for connecting via TCP
    host: false, // IP of host to connect to TCP interface
    port: false, // Port of host to use when connecting via TCP interface
    timeout: 60000, // Timeout for scanning files
    localFallback: true, // Use local preferred binary to scan if socket/tcp fails
    path: '/usr/bin/clamdscan', // Path to the clamdscan binary on your server
    configFile: null, // Specify config file if it's in an unusual place
    multiscan: true, // Scan using all available cores! Yay!
    reloadDb: false, // If true, will re-load the DB on every call (slow)
    active: true, // If true, this module will consider using the clamdscan binary
    bypassTest: false, // Check to see if socket is available when applicable
  },
  preference: 'clamdscan', // If clamdscan is found and active, it will be used by default
};

@Injectable()
export class FilesService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}
  private readonly logger = new Logger(FilesService.name);

  private generatePath(folder: string): string {
    this.logger.log('Generate path');
    const folderPath = path.resolve(process.cwd(), '..', 'public', folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    return folderPath;
  }

  private async virusCheck(path: string): Promise<boolean> {
    this.logger.log('Virus check (start)');
    const ClamScan = new NodeClam().init(options);
    console.log(path);
    const { file, isInfected, viruses } = await (
      await ClamScan
    ).isInfected(path);
    this.logger.verbose(
      `Is infected: (${isInfected}). Viruses: (${viruses.join(', ')})`,
    );
    if (isInfected) {
      this.deleteFile(path);
      throw new BadRequestError('File has viruses');
    }
    this.logger.log('Virus check (end)');
    return isInfected;
  }

  private async convert(
    oldFilePath: string,
    newFilePath: string,
    height: number,
    width: number,
  ): Promise<void> {
    this.logger.log('Convert');

    await sharp(oldFilePath)
      .toFormat('webp')
      .resize(width, height)
      .toFile(newFilePath)
      .catch((err) => {
        this.logger.error('Convert error.', err);
        throw new InternalServerError('Convert error');
      });

    fs.unlink(oldFilePath, (err) => {
      if (err) {
        this.logger.error('Convert error during deleting original file.', err);
        throw new InternalServerError(
          'Convert error. Please try another image.',
        );
      } else {
        console.log('deleted: ', oldFilePath);
      }
    });
  }

  private async download(filePath: string, url: string): Promise<void> {
    this.logger.log('Download');
    console.log(filePath);
    try {
      const file = await download.image({
        dest: filePath,
        url: url,
        extractFilename: false,
      });
      if (!file) {
        throw new InternalServerError('Downloading error');
      }
    } catch (err) {
      this.logger.error('Downloading error.', err);
      throw new InternalServerError(
        'Downloading error. Please try another image.',
      );
    }
  }

  public async downloadFile(
    url: string,
    folder: string,
    height: number,
    width: number,
  ): Promise<string> {
    this.logger.log(`Download file by url (start)`);
    if (!url) {
      this.logger.warn('Empty query');
      throw new BadRequestError('Empty query');
    }
    const uuidName = uuid.v4();
    const newName = uuidName + '.webp';
    const oldName = uuidName + '1' + '.webp';
    const folderPath = this.generatePath(folder);
    const oldFilePath = path.join(folderPath, oldName);
    const newFilePath = path.join(folderPath, newName);

    await this.download(oldFilePath, url);
    await this.virusCheck(oldFilePath);
    await this.convert(oldFilePath, newFilePath, height, width);
    this.logger.log(`Download file by url (end)`);
    return `${folder}/${newName}`;
  }

  public async createFile(
    fileName: string,
    folder: string,
    height: number,
    width: number,
  ) {
    this.logger.log(`Download file by file (start)`);
    const newFileName = uuid.v4() + '.webp';
    const folderPath = this.generatePath(folder);
    const oldFilePath = path.join(folderPath, fileName);
    const newFilePath = path.join(folderPath, newFileName);

    await this.convert(oldFilePath, newFilePath, height, width);
    await this.virusCheck(newFilePath);
    // this.logger.verbose(`Path: (public\\${newFilePath}`);
    this.logger.log(`Download file by file (end)`);
    return `${folder}/${newFileName}`;
  }

  private isDownloaded(link: string): boolean {
    const api_url = process.env.CLIENT_URL;
    const targetSubstring = api_url + '/api/public';
    return link.includes(targetSubstring);
  }

  public async static(
    fileName: string,
    folder: string,
  ): Promise<fs.ReadStream> {
    const basePath = path.resolve(process.cwd(), '..', 'public');
    const imagePath = path.join(basePath, folder, fileName);
    const exists = await fs.promises
      .access(imagePath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);
    if (exists) {
      // this.logger.verbose(`Image path: (${imagePath})`);
      const fileStream = fs.createReadStream(imagePath);
      return fileStream;
    } else {
      this.logger.warn('File not found');
      throw new NotFoundError('File not found');
    }
  }

  private extractNameFromLink(link: string, folder: string): string | null {
    const targetSubstring = folder + '/';
    const startIndex = link.indexOf(targetSubstring);
    if (startIndex !== -1) {
      const idStartIndex = startIndex + targetSubstring.length;
      return link.substring(idStartIndex);
    }
    return null;
  }

  private moveFile(
    name: string,
    sourceFolder: string,
    destinationFolder: string,
  ): string {
    this.logger.log('Move file (start)');
    const sourcePath = path.join(this.generatePath(sourceFolder), name);
    const destinationPath = path.join(
      this.generatePath(destinationFolder),
      name,
    );
    this.logger.verbose(`From: (${sourcePath}). To: (${destinationPath})`);
    fs.rename(
      sourcePath,
      destinationPath,
      (err: NodeJS.ErrnoException | null) => {
        if (err) {
          this.logger.error('Move file error', err);
          throw new InternalServerError('Move file error');
        }
      },
    );
    this.logger.log('Move file (end)');
    return `${destinationFolder}/${name}`;
  }

  public async createMediaImage(
    media: MediaEnum,
    link: string,
  ): Promise<string> {
    try {
      this.logger.log('Create private media file (start)');
      if (!link) {
        return null;
      }
      if (this.isDownloaded(link)) {
        const name = this.extractNameFromLink(link, FoldersEnum.trashCan);
        if (!name) {
          return null;
        }
        switch (media) {
          case MediaEnum.film: {
            return this.moveFile(name, FoldersEnum.trashCan, FoldersEnum.films);
          }
          case MediaEnum.series: {
            return this.moveFile(
              name,
              FoldersEnum.trashCan,
              FoldersEnum.series,
            );
          }
          case MediaEnum.comics: {
            return this.moveFile(
              name,
              FoldersEnum.trashCan,
              FoldersEnum.comics,
            );
          }
          case MediaEnum.book: {
            return this.moveFile(name, FoldersEnum.trashCan, FoldersEnum.books);
          }
        }
      } else {
        switch (media) {
          case MediaEnum.film: {
            return await this.downloadFile(link, FoldersEnum.films, 900, 600);
          }
          case MediaEnum.series: {
            return await this.downloadFile(link, FoldersEnum.series, 900, 600);
          }
          case MediaEnum.comics: {
            return await this.downloadFile(link, FoldersEnum.comics, 900, 600);
          }
          case MediaEnum.book: {
            return await this.downloadFile(link, FoldersEnum.books, 900, 600);
          }
        }
      }
    } catch (err) {
      this.logger.warn('Create private media file error', err);
      throw new InternalServerError('Add image file error');
    }
  }

  private deleteFile(path: string): void {
    this.logger.log('Delete file');
    fs.unlink(path, (err) => {
      if (err) {
        this.logger.error('Delete file (error)', err);
        throw new InternalServerError('Delete file error');
      }
    });
  }

  public deleteImage(imagePath: string): void {
    this.logger.log('Delete image');
    const filePath = this.generatePath(imagePath);
    this.deleteFile(filePath);
  }

  public async updateMediaImage(
    media: MediaEnum,
    oldLink: string,
    newLink: string,
  ): Promise<string> {
    this.logger.log('Create private media file (start)');
    if (!newLink || !oldLink) {
      return null;
    }
    let res: string;

    const newName = this.extractNameFromLink(newLink, FoldersEnum.trashCan);

    switch (media) {
      case MediaEnum.film: {
        const oldName = this.extractNameFromLink(oldLink, FoldersEnum.films);
        const folderPath = this.generatePath(FoldersEnum.films);
        const deletePath = path.join(folderPath, oldName);
        this.deleteFile(deletePath);
        res = this.moveFile(newName, FoldersEnum.trashCan, FoldersEnum.films);
        break;
      }
      case MediaEnum.series: {
        const oldName = this.extractNameFromLink(oldLink, FoldersEnum.series);
        const folderPath = this.generatePath(FoldersEnum.series);
        const deletePath = path.join(folderPath, oldName);
        this.deleteFile(deletePath);
        res = this.moveFile(newName, FoldersEnum.trashCan, FoldersEnum.series);
        break;
      }
      case MediaEnum.comics: {
        const oldName = this.extractNameFromLink(oldLink, FoldersEnum.comics);
        const folderPath = this.generatePath(FoldersEnum.comics);
        const deletePath = path.join(folderPath, oldName);
        this.deleteFile(deletePath);
        res = this.moveFile(newName, FoldersEnum.trashCan, FoldersEnum.comics);
        break;
      }
      case MediaEnum.book: {
        const oldName = this.extractNameFromLink(oldLink, FoldersEnum.books);
        const folderPath = this.generatePath(FoldersEnum.books);
        const deletePath = path.join(folderPath, oldName);
        this.deleteFile(deletePath);
        res = this.moveFile(newName, FoldersEnum.trashCan, FoldersEnum.books);
        break;
      }
    }

    return res;
  }

  public async updateUserMedia(
    userId: string,
    fileName: string,
  ): Promise<string> {
    const filePath = await this.createFile(
      fileName,
      FoldersEnum.users,
      300,
      300,
    );
    const { picture } = await this.usersService.getUserById(userId);
    await this.usersService.updatePicture(userId, filePath);
    if (picture) {
      const arr = picture.split('/');
      const folder = arr[0];
      const name = arr[1];
      const folderPath = this.generatePath(folder);
      const deletePath = path.join(folderPath, name);
      this.deleteFile(deletePath);
    }
    return filePath;
  }

  public async deleteOldFiles(folder: string): Promise<void> {
    this.logger.log('Started deleting old files');
    const folderPath = this.generatePath(folder);

    try {
      const files = await fs.promises.readdir(folderPath);

      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);

      for (const file of files) {
        const filePath = path.join(folderPath, file);
        const fileStats = await fs.promises.stat(filePath);

        if (fileStats.isFile() && fileStats.ctime < oneDayAgo) {
          await fs.promises.unlink(filePath);
          this.logger.log(`Deleted old file: ${filePath}`);
        }
      }

      this.logger.log('Completed deleting old files');
    } catch (err) {
      this.logger.error('Error deleting old files', err);
      throw new InternalServerError('Error deleting old files');
    }
  }
}
