import {
  Field,
  ID,
  ObjectType,
  Int,
  PickType,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { RolesEnum } from 'src/shared/enums';

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field(() => RolesEnum)
  role: RolesEnum;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  note: string;

  @Field({ nullable: true })
  picture: string;

  @Field((type) => Int)
  mediaTokens: number;

  @Field((type) => Int)
  additionalMediaTokens: number;

  @Field((type) => ID, { nullable: true })
  activationLink: string;

  @Field((type) => ID, { nullable: true })
  resetPasswordLink: string;

  @Field((type) => Boolean)
  isActivated: boolean;

  @Field((type) => ID, { nullable: true })
  banReason: string;

  @Field((type) => Boolean)
  isBanned: boolean;

  @Field((type) => [String], { nullable: true })
  warnings: string[];

  @Field((type) => Boolean)
  canSendReport: boolean;

  @Field((type) => GraphQLISODateTime)
  createdAt: Date;
}

@ObjectType()
export class FollowUser extends PickType(User, [
  'id',
  'name',
  'picture',
] as const) {}
