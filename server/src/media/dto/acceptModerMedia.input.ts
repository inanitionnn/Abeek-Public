import { Field, InputType, IntersectionType } from '@nestjs/graphql';
import {
  BookParseInput,
  ComicsParseInput,
  FilmParseInput,
  SeriesMediaInput,
} from 'src/shared/dto';
import { MediaEnum } from 'src/shared/enums';

@InputType()
class FilmSeriesMedia extends IntersectionType(
  FilmParseInput,
  SeriesMediaInput,
) {}

@InputType()
class BookComicsMedia extends IntersectionType(
  BookParseInput,
  ComicsParseInput,
) {}

@InputType()
export class MappedMedia extends IntersectionType(
  FilmSeriesMedia,
  BookComicsMedia,
) {}

@InputType()
export class AcceptModerMediaInput {
  @Field(() => MediaEnum)
  mediaType: MediaEnum;

  @Field(() => MappedMedia)
  media: MappedMedia;

  @Field(() => Boolean, { nullable: true })
  isPublic: boolean;

  @Field({ nullable: true })
  reportId: string;

  @Field({ nullable: true })
  oldImage: string;

  @Field(() => Boolean, { nullable: true })
  isChecked: boolean;

  @Field()
  mediaId: string;
}
