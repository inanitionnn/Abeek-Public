import {
  Field,
  InputType,
  Int,
  IntersectionType,
  ObjectType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
import { BookEnum, CreatedEnum, MediaEnum } from '../enums';
import { UserMediaInput, UserMediaResponse } from './userMedia';

@ObjectType()
export class BookBaseResponse {
  @Field({ nullable: true })
  id: string;

  @Field(() => MediaEnum, { nullable: true })
  media?: MediaEnum;

  @Field(() => BookEnum, { nullable: true })
  bookType?: BookEnum;

  @Field({ nullable: true })
  title?: string;

  @Field(() => [String], { nullable: true })
  author?: string[];

  @Field(() => Int, { nullable: true })
  year?: number;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  language?: string;

  @Field(() => Int, { nullable: true })
  pages?: number;

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
export class BookParseResponse extends OmitType(BookBaseResponse, [
  'id',
] as const) {}

@ObjectType()
export class BookSearchResponse extends BookBaseResponse {
  @Field(() => Boolean, { nullable: true })
  inUserMedia: boolean;
}

@ObjectType()
export class BookMediaResponse extends IntersectionType(
  BookBaseResponse,
  PickType(UserMediaResponse, ['note', 'rate', 'watched'] as const),
) {
  @Field(() => Boolean, { nullable: true })
  inUserMedia: boolean;
}

// Input Type

@InputType()
export class BookParseInput {
  @Field(() => MediaEnum, { nullable: true })
  media?: MediaEnum;

  @Field(() => BookEnum, { nullable: true })
  bookType?: BookEnum;

  @Field({ nullable: true })
  title?: string;

  @Field(() => [String], { nullable: true })
  author?: string[];

  @Field(() => Int, { nullable: true })
  year?: number;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  language?: string;

  @Field(() => Int, { nullable: true })
  pages?: number;

  @Field(() => [String], { nullable: true })
  genres?: string[];

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field({ nullable: true })
  image?: string;
}

@InputType()
export class BookCreateInput extends PickType(UserMediaInput, [
  'note',
  'rate',
  'watched',
] as const) {
  @Field(() => BookParseInput)
  book: BookParseInput;

  @Field(() => CreatedEnum)
  createdType: CreatedEnum;

  @Field(() => String, { nullable: true })
  report?: string;
}
