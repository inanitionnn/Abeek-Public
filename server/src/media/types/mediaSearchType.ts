import { createUnionType } from '@nestjs/graphql';
import {
  BookSearchResponse,
  ComicsSearchResponse,
  FilmSearchResponse,
  SeriesSearchResponse,
} from 'src/shared/dto';
import { MediaEnum } from 'src/shared/enums';

export const MediaSearchType = createUnionType({
  name: 'MediaSearchType',
  types: () =>
    [
      FilmSearchResponse,
      SeriesSearchResponse,
      ComicsSearchResponse,
      BookSearchResponse,
    ] as const,
  resolveType(value) {
    if (value.media === MediaEnum.film) {
      return FilmSearchResponse;
    }
    if (value.media === MediaEnum.series) {
      return SeriesSearchResponse;
    }
    if (value.media === MediaEnum.comics) {
      return ComicsSearchResponse;
    }
    if (value.media === MediaEnum.book) {
      return BookSearchResponse;
    }
    return null;
  },
});
