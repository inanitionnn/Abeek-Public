import { Field, InputType, Int } from '@nestjs/graphql';
import {
  BookEnum,
  ComicsEnum,
  FilmEnum,
  MediaEnum,
  SeriesEnum,
  SortedEnum,
  WatchedEnum,
} from 'src/shared/enums';

@InputType()
export class GetUserMediaInput {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  count: number;

  @Field({ nullable: true })
  userId: string;

  @Field(() => MediaEnum)
  mediaTYpe: MediaEnum;

  @Field(() => SortedEnum, { nullable: true })
  sorted: SortedEnum;

  @Field(() => WatchedEnum, { nullable: true })
  watched: WatchedEnum;

  @Field(() => FilmEnum, { nullable: true })
  filmType: FilmEnum;

  @Field(() => SeriesEnum, { nullable: true })
  seriesType: SeriesEnum;

  @Field(() => BookEnum, { nullable: true })
  bookType: BookEnum;

  @Field(() => ComicsEnum, { nullable: true })
  comicsType: ComicsEnum;
}
