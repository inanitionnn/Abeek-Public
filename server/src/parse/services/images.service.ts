import { Injectable, Logger } from '@nestjs/common';
import GoogleImages from 'google-images';
import { ImagesInput, ImagesResponse } from '../dto';
import { UsersService } from 'src/users/users.service';
import { ForbiddenError } from '@nestjs/apollo';
import { MediaEnum } from 'src/shared/enums';
import { ImageType } from '../types/imageType';

@Injectable()
export class ImagesService {
  private readonly logger = new Logger(ImagesService.name);

  constructor(private readonly usersService: UsersService) {}

  // Parse google images
  private async loadImages(
    query: string,
    count: number,
    client: any,
  ): Promise<string[]> {
    let imageCount = 0;
    let page = 1;
    const resImages = [];
    while (page < 4) {
      const images: ImageType[] = await client.search(query, {
        page: page,
        size: 'xlarge',
      });

      for (let i = 0; i < images.length && imageCount < count; i++) {
        const image = images[i];
        const width = image.width;
        const height = image.height;
        if (height >= width && height >= 700) {
          if (!resImages.includes(image.url)) {
            resImages.push(image.url);
            imageCount++;
          }
        }
      }

      if (imageCount < count) {
        page++;
      } else {
        imageCount = 0;
        break;
      }
    }
    this.logger.log(`Load images`);
    this.logger.verbose(`Count: (${resImages.length})`);
    return resImages;
  }

  public async ImageParse(
    userId: string,
    dto: ImagesInput,
  ): Promise<ImagesResponse> {
    this.logger.log(`Image parse (start)`);

    // Checks whether the user can pay for the service
    const { access, additionalMediaTokens, mediaTokens } =
      await this.usersService.subtractToken({ userId: userId, tokenCost: 8 });
    if (!access) {
      this.logger.warn('Search title error');
      throw new ForbiddenError('You have no tokens');
    }

    // Google connect
    const engineId = process.env.GOOGLE_SEARCH_ID;
    const apiKey = process.env.GOOGLE_API_KEY;
    const client = new GoogleImages(engineId, apiKey);

    let normalQuery;
    if (dto.mediaType === MediaEnum.film) {
      normalQuery = dto.query + ' film poster cover jpg';
    }

    if (dto.mediaType === MediaEnum.series) {
      normalQuery = dto.query + ' series poster cover jpg';
    }

    if (dto.mediaType === MediaEnum.book) {
      normalQuery = dto.query + ' book cover jpg';
    }

    if (dto.mediaType === MediaEnum.comics) {
      normalQuery = dto.query + ' comic cover jpg';
    }

    const resImages = await this.loadImages(normalQuery, dto.count, client);
    const res = {
      links: resImages,
      additionalMediaTokens: additionalMediaTokens,
      mediaTokens: mediaTokens,
    };

    this.logger.log(`Image parse (end)`);
    return res;
  }
}
