import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SeriesSeasonResponse {
  @Field({ nullable: true })
  id: string;

  @Field(() => Int, { nullable: true })
  season: number;

  @Field(() => Int, { nullable: true })
  episodes: number;

  @Field({ nullable: true })
  title: string;
}

@ObjectType()
export class SeriesSeasonRateResponse extends SeriesSeasonResponse {
  @Field(() => Int, { nullable: true })
  rate: number;
}

@InputType()
export class SeriesSeasonInput {
  @Field({ nullable: true })
  id: string;

  @Field(() => Int, { nullable: true })
  season: number;

  @Field(() => Int, { nullable: true })
  episodes: number;

  @Field({ nullable: true })
  title: string;
}

@InputType()
export class SeriesSeasonRateInput extends SeriesSeasonInput {
  @Field(() => Int, { nullable: true })
  rate: number;
}
