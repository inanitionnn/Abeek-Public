import {
  Field,
  InputType,
  Int,
  IntersectionType,
  ObjectType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
import {
  SeriesSeasonInput,
  SeriesSeasonRateInput,
  SeriesSeasonRateResponse,
  SeriesSeasonResponse,
} from './seriesSeason';
import { CreatedEnum, MediaEnum, SeriesEnum } from '../enums';
import { UserMediaInput, UserMediaResponse } from './userMedia';

@ObjectType()
export class SeriesBaseResponse {
  @Field({ nullable: true })
  id: string;

  @Field(() => MediaEnum, { nullable: true })
  media?: MediaEnum;

  @Field(() => SeriesEnum, { nullable: true })
  seriesType?: SeriesEnum;

  @Field({ nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  startYear?: number;

  @Field(() => Int, { nullable: true })
  endYear?: number;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  plot?: string;

  @Field({ nullable: true })
  language?: string;

  @Field(() => [String], { nullable: true })
  directedBy?: string[];

  @Field(() => [String], { nullable: true })
  genres?: string[];

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field({ nullable: true })
  image?: string;

  @Field(() => Boolean, { nullable: true })
  isPublic?: boolean;
}

@ObjectType()
export class SeriesParseResponse extends OmitType(SeriesBaseResponse, [
  'id',
] as const) {
  @Field(() => [SeriesSeasonResponse], { nullable: true })
  seasons?: SeriesSeasonResponse[];
}

@ObjectType()
export class SeriesModerResponse extends SeriesBaseResponse {
  @Field(() => [SeriesSeasonResponse], { nullable: true })
  seasons: SeriesSeasonResponse[];
}

@ObjectType()
export class SeriesSearchResponse extends SeriesBaseResponse {
  @Field(() => Boolean, { nullable: true })
  inUserMedia: boolean;
}

@ObjectType()
export class SeriesMediaResponse extends IntersectionType(
  SeriesBaseResponse,
  PickType(UserMediaResponse, ['note', 'rate', 'watched'] as const),
) {
  @Field(() => Boolean, { nullable: true })
  inUserMedia: boolean;

  @Field(() => [SeriesSeasonRateResponse], { nullable: true })
  seasons?: SeriesSeasonRateResponse[];
}

// Input Type

@InputType()
export class SeriesBaseInput {
  @Field(() => MediaEnum, { nullable: true })
  media?: MediaEnum;

  @Field(() => SeriesEnum, { nullable: true })
  seriesType?: SeriesEnum;

  @Field({ nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  startYear?: number;

  @Field(() => Int, { nullable: true })
  endYear?: number;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  plot?: string;

  @Field({ nullable: true })
  language?: string;

  @Field(() => [String], { nullable: true })
  directedBy?: string[];

  @Field(() => [String], { nullable: true })
  genres?: string[];

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field({ nullable: true })
  image?: string;
}

@InputType()
export class SeriesParseInput extends SeriesBaseInput {
  @Field(() => [SeriesSeasonRateInput], { nullable: true })
  seasons?: SeriesSeasonRateInput[];
}

@InputType()
export class SeriesMediaInput extends SeriesBaseInput {
  @Field(() => [SeriesSeasonInput], { nullable: true })
  seasons?: SeriesSeasonInput[];
}

@InputType()
export class SeriesCreateInput extends PickType(UserMediaInput, [
  'note',
  'rate',
  'watched',
] as const) {
  @Field(() => SeriesParseInput)
  series: SeriesParseInput;

  @Field(() => CreatedEnum)
  createdType: CreatedEnum;

  @Field(() => String, { nullable: true })
  report?: string;
}
