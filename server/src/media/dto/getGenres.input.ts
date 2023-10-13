import { Field, InputType } from '@nestjs/graphql';
import {
  BookEnum,
  ComicsEnum,
  FilmEnum,
  MediaEnum,
  SeriesEnum,
} from 'src/shared/enums';

@InputType()
export class GetGenresInput {
  @Field(() => Boolean)
  inUserMedia: boolean;

  @Field(() => MediaEnum)
  mediaType: MediaEnum;

  @Field(() => FilmEnum, { nullable: true })
  filmType: FilmEnum;

  @Field(() => SeriesEnum, { nullable: true })
  seriesType: SeriesEnum;

  @Field(() => BookEnum, { nullable: true })
  bookType: BookEnum;

  @Field(() => ComicsEnum, { nullable: true })
  comicsType: ComicsEnum;
}
