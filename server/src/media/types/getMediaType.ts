import { createUnionType } from '@nestjs/graphql';
import {
  BookMediaResponse,
  ComicsMediaResponse,
  FilmMediaResponse,
  SeriesMediaResponse,
} from 'src/shared/dto';
import { MediaEnum } from 'src/shared/enums';

export const GetMediaType = createUnionType({
  name: 'GetMediaType',
  types: () =>
    [
      FilmMediaResponse,
      SeriesMediaResponse,
      ComicsMediaResponse,
      BookMediaResponse,
    ] as const,
  resolveType(value) {
    if (value.media === MediaEnum.film) {
      return FilmMediaResponse;
    }
    if (value.media === MediaEnum.series) {
      return SeriesMediaResponse;
    }
    if (value.media === MediaEnum.comics) {
      return ComicsMediaResponse;
    }
    if (value.media === MediaEnum.book) {
      return BookMediaResponse;
    }
    return null;
  },
});
