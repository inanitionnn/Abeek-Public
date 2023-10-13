import { Field, InputType, Int } from '@nestjs/graphql';
import {
  BookEnum,
  ComicsEnum,
  FilmEnum,
  MediaEnum,
  SeriesEnum,
} from 'src/shared/enums';

@InputType()
export class GetRandomMediaInput {
  @Field(() => Int)
  count: number;

  @Field(() => Boolean)
  InUserMedia: boolean;

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

  @Field(() => [String], { nullable: true })
  genres: string[];

  @Field(() => Int, { nullable: true })
  fromYear: number;

  @Field(() => Int, { nullable: true })
  toYear: number;
}
