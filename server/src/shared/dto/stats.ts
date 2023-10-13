import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { ComicsEnum, FilmEnum } from '../enums';
import { GetUserInfoResponse } from 'src/users/dto';

@ObjectType()
class MediaStatsResponse {
  @Field(() => Int, { nullable: true })
  allCount: number;

  @Field(() => Int, { nullable: true })
  completedCount: number;

  @Field(() => Int, { nullable: true })
  plannedCount: number;
  @Field(() => Int, { nullable: true })
  pausedCount: number;

  @Field(() => Int, { nullable: true })
  abandonedCount: number;

  @Field(() => Int, { nullable: true })
  reviewingCount: number;

  @Field(() => Int, { nullable: true })
  viewingCount: number;

  @Field(() => Float, { nullable: true })
  averageRating: number;
}

@ObjectType()
export class FilmsStatsResponse {
  @Field(() => MediaStatsResponse, { nullable: true })
  all: MediaStatsResponse;

  @Field(() => MediaStatsResponse, { nullable: true })
  animated: MediaStatsResponse;

  @Field(() => MediaStatsResponse, { nullable: true })
  anime: MediaStatsResponse;

  @Field(() => MediaStatsResponse, { nullable: true })
  movie: MediaStatsResponse;
}

@ObjectType()
export class SeriesStatsResponse {
  @Field(() => MediaStatsResponse, { nullable: true })
  all: MediaStatsResponse;

  @Field(() => MediaStatsResponse, { nullable: true })
  animated: MediaStatsResponse;

  @Field(() => MediaStatsResponse, { nullable: true })
  anime: MediaStatsResponse;

  @Field(() => MediaStatsResponse, { nullable: true })
  tv: MediaStatsResponse;
}

@ObjectType()
export class ComicsStatsResponse {
  @Field(() => MediaStatsResponse, { nullable: true })
  all: MediaStatsResponse;

  @Field(() => MediaStatsResponse, { nullable: true })
  comics: MediaStatsResponse;

  @Field(() => MediaStatsResponse, { nullable: true })
  graphicNovel: MediaStatsResponse;

  @Field(() => MediaStatsResponse, { nullable: true })
  manga: MediaStatsResponse;

  @Field(() => MediaStatsResponse, { nullable: true })
  manhwa: MediaStatsResponse;
}

@ObjectType()
export class BooksStatsResponse {
  @Field(() => MediaStatsResponse, { nullable: true })
  all: MediaStatsResponse;

  @Field(() => MediaStatsResponse, { nullable: true })
  fiction: MediaStatsResponse;

  @Field(() => MediaStatsResponse, { nullable: true })
  nonFiction: MediaStatsResponse;
}

@ObjectType()
export class StatsReponse {
  @Field(() => FilmsStatsResponse, { nullable: true })
  films: FilmsStatsResponse;

  @Field(() => SeriesStatsResponse, { nullable: true })
  series: SeriesStatsResponse;

  @Field(() => ComicsStatsResponse, { nullable: true })
  comics: ComicsStatsResponse;

  @Field(() => BooksStatsResponse, { nullable: true })
  books: BooksStatsResponse;
}

@ObjectType()
export class ProfileInfoReponse extends GetUserInfoResponse {
  @Field(() => StatsReponse, { nullable: true })
  mediaStats: StatsReponse;
}
