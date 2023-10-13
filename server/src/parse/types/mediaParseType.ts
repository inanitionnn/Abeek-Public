import { createUnionType } from '@nestjs/graphql';
import {
  BookParseResponse,
  ComicsParseResponse,
  FilmParseResponse,
  SeriesParseResponse,
} from 'src/shared/dto';
import { MediaEnum } from 'src/shared/enums';

const MediaParseType = createUnionType({
  name: 'MediaParseType',
  types: () =>
    [
      FilmParseResponse,
      SeriesParseResponse,
      ComicsParseResponse,
      BookParseResponse,
    ] as const,
  resolveType(value) {
    if (value.media === MediaEnum.film) {
      return FilmParseResponse;
    }
    if (value.media === MediaEnum.series) {
      return SeriesParseResponse;
    }
    if (value.media === MediaEnum.comics) {
      return ComicsParseResponse;
    }
    if (value.media === MediaEnum.book) {
      return BookParseResponse;
    }
    return null;
  },
});
export default MediaParseType;
