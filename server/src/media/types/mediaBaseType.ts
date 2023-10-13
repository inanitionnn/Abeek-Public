import { createUnionType } from '@nestjs/graphql';
import {
  BookBaseResponse,
  ComicsBaseResponse,
  FilmBaseResponse,
  SeriesBaseResponse,
} from 'src/shared/dto';
import { MediaEnum } from 'src/shared/enums';

export const MediaBaseType = createUnionType({
  name: 'MediaBaseType',
  types: () =>
    [
      FilmBaseResponse,
      SeriesBaseResponse,
      ComicsBaseResponse,
      BookBaseResponse,
    ] as const,
  resolveType(value) {
    if (value.media === MediaEnum.film) {
      return FilmBaseResponse;
    }
    if (value.media === MediaEnum.series) {
      return SeriesBaseResponse;
    }
    if (value.media === MediaEnum.comics) {
      return ComicsBaseResponse;
    }
    if (value.media === MediaEnum.book) {
      return BookBaseResponse;
    }
    return null;
  },
});
