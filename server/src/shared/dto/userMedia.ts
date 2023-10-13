import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { ChangedEnum, MediaEnum, WatchedEnum } from '../enums';

@ObjectType()
export class UserMediaResponse {
  @Field({ nullable: true })
  userId?: string;

  @Field(() => [ChangedEnum], { nullable: true })
  changed?: ChangedEnum[];

  @Field(() => MediaEnum, { nullable: true })
  mediaType?: MediaEnum;

  @Field({ nullable: true })
  mediaId?: string;

  @Field(() => WatchedEnum, { nullable: true })
  watched?: WatchedEnum;

  @Field(() => Int, { nullable: true })
  rate?: number;

  @Field({ nullable: true })
  note?: string;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

@ObjectType()
export class UserMediaFollowResponse extends PickType(UserMediaResponse, [
  'userId',
  'watched',
  'rate',
  'note',
] as const) {}

@InputType()
export class UserMediaInput {
  @Field({ nullable: true })
  userId?: string;

  @Field(() => MediaEnum, { nullable: true })
  mediaType?: MediaEnum;

  @Field({ nullable: true })
  mediaId?: string;

  @Field(() => WatchedEnum, { nullable: true })
  watched?: WatchedEnum;

  @Field(() => Int, { nullable: true })
  rate?: number;

  @Field({ nullable: true })
  note?: string;
}
