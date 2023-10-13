import {
  Field,
  InputType,
  Int,
  IntersectionType,
  ObjectType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
import { ComicsEnum, CreatedEnum, MediaEnum } from '../enums';
import { UserMediaInput, UserMediaResponse } from './userMedia';

@ObjectType()
export class ComicsBaseResponse {
  @Field({ nullable: true })
  id: string;

  @Field(() => MediaEnum, { nullable: true })
  media?: MediaEnum;

  @Field(() => ComicsEnum, { nullable: true })
  comicsType?: ComicsEnum;

  @Field({ nullable: true })
  title?: string;

  @Field(() => [String], { nullable: true })
  author?: string[];

  @Field(() => Int, { nullable: true })
  startYear?: number;

  @Field(() => Int, { nullable: true })
  endYear?: number;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  language?: string;

  @Field(() => Int, { nullable: true })
  volumes?: number;

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
export class ComicsParseResponse extends OmitType(ComicsBaseResponse, [
  'id',
] as const) {}

@ObjectType()
export class ComicsSearchResponse extends ComicsBaseResponse {
  @Field(() => Boolean, { nullable: true })
  inUserMedia: boolean;
}

@ObjectType()
export class ComicsMediaResponse extends IntersectionType(
  ComicsBaseResponse,
  PickType(UserMediaResponse, ['note', 'rate', 'watched'] as const),
) {
  @Field(() => Boolean, { nullable: true })
  inUserMedia: boolean;
}

// Input Type

@InputType()
export class ComicsParseInput {
  @Field(() => MediaEnum, { nullable: true })
  media?: MediaEnum;

  @Field(() => ComicsEnum, { nullable: true })
  comicsType?: ComicsEnum;

  @Field({ nullable: true })
  title?: string;

  @Field(() => [String], { nullable: true })
  author?: string[];

  @Field(() => Int, { nullable: true })
  startYear?: number;

  @Field(() => Int, { nullable: true })
  endYear?: number;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  language?: string;

  @Field(() => Int, { nullable: true })
  volumes?: number;

  @Field(() => [String], { nullable: true })
  genres?: string[];

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field({ nullable: true })
  image?: string;
}

@InputType()
export class ComicsCreateInput extends PickType(UserMediaInput, [
  'note',
  'rate',
  'watched',
] as const) {
  @Field(() => ComicsParseInput)
  comics: ComicsParseInput;

  @Field(() => CreatedEnum)
  createdType: CreatedEnum;

  @Field(() => String, { nullable: true })
  report?: string;
}
