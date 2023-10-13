import { Field, InputType, IntersectionType, PickType } from '@nestjs/graphql';
import {
  BookParseInput,
  ComicsParseInput,
  FilmParseInput,
  SeriesParseInput,
  UserMediaInput,
} from 'src/shared/dto';
import { CreatedEnum, MediaEnum } from 'src/shared/enums';

@InputType()
class FilmSeriesMedia extends IntersectionType(
  FilmParseInput,
  SeriesParseInput,
) {}

@InputType()
class BookComicsMedia extends IntersectionType(
  BookParseInput,
  ComicsParseInput,
) {}

@InputType()
export class MappedParseMedia extends IntersectionType(
  FilmSeriesMedia,
  BookComicsMedia,
) {}

@InputType()
export class CreateMediaInput extends PickType(UserMediaInput, [
  'note',
  'rate',
  'watched',
] as const) {
  @Field(() => MediaEnum)
  mediaType: MediaEnum;

  @Field(() => MappedParseMedia)
  media: MappedParseMedia;

  @Field(() => CreatedEnum)
  createdType: CreatedEnum;

  @Field(() => String, { nullable: true })
  report?: string;
}
