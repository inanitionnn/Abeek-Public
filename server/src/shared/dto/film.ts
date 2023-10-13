import {
  Field,
  InputType,
  Int,
  IntersectionType,
  ObjectType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
import { CreatedEnum, FilmEnum, MediaEnum } from '../enums';
import { UserMediaInput, UserMediaResponse } from './userMedia';

@ObjectType()
export class FilmBaseResponse {
  @Field({ nullable: true })
  id: string;

  @Field(() => MediaEnum, { nullable: true })
  media?: MediaEnum;

  @Field(() => FilmEnum, { nullable: true })
  filmType?: FilmEnum;

  @Field({ nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  year?: number;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  plot?: string;

  @Field({ nullable: true })
  language?: string;

  @Field(() => [String], { nullable: true })
  directedBy?: string[];

  @Field(() => [String], { nullable: true })
  starring?: string[];

  @Field({ nullable: true })
  runTime?: string;

  @Field({ nullable: true })
  boxOffice?: string;

  @Field({ nullable: true })
  budget?: string;

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
export class FilmParseResponse extends OmitType(FilmBaseResponse, [
  'id',
] as const) {}

@ObjectType()
export class FilmSearchResponse extends FilmBaseResponse {
  @Field(() => Boolean, { nullable: true })
  inUserMedia: boolean;
}

@ObjectType()
export class FilmMediaResponse extends IntersectionType(
  FilmBaseResponse,
  PickType(UserMediaResponse, ['note', 'rate', 'watched'] as const),
) {
  @Field(() => Boolean, { nullable: true })
  inUserMedia: boolean;
}

// Input Type

@InputType()
export class FilmParseInput {
  @Field(() => MediaEnum, { nullable: true })
  media?: MediaEnum;

  @Field(() => FilmEnum, { nullable: true })
  filmType?: FilmEnum;

  @Field({ nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  year?: number;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  plot?: string;

  @Field({ nullable: true })
  language?: string;

  @Field(() => [String], { nullable: true })
  directedBy?: string[];

  @Field(() => [String], { nullable: true })
  starring?: string[];

  @Field({ nullable: true })
  runTime?: string;

  @Field({ nullable: true })
  boxOffice?: string;

  @Field({ nullable: true })
  budget?: string;

  @Field(() => [String], { nullable: true })
  genres?: string[];

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field({ nullable: true })
  image?: string;
}

@InputType()
export class FilmCreateInput extends PickType(UserMediaInput, [
  'note',
  'rate',
  'watched',
] as const) {
  @Field(() => FilmParseInput)
  film: FilmParseInput;

  @Field(() => CreatedEnum)
  createdType: CreatedEnum;

  @Field(() => String, { nullable: true })
  report?: string;
}
