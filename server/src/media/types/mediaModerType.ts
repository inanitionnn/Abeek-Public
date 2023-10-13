import { createUnionType } from '@nestjs/graphql';
import {
  BookBaseResponse,
  ComicsBaseResponse,
  FilmBaseResponse,
  SeriesModerResponse,
} from 'src/shared/dto';
import { MediaEnum } from 'src/shared/enums';

export const MediaModerType = createUnionType({
  name: 'MediaModerType',
  types: () =>
    [
      FilmBaseResponse,
      SeriesModerResponse,
      ComicsBaseResponse,
      BookBaseResponse,
    ] as const,
  resolveType(value) {
    if (value.media === MediaEnum.film) {
      return FilmBaseResponse;
    }
    if (value.media === MediaEnum.series) {
      return SeriesModerResponse;
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
