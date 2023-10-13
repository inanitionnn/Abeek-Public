import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetUserInfoResponse {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  picture: string;

  @Field({ nullable: true })
  note: string;

  @Field(() => Int, { nullable: true })
  followerCount: number;

  @Field(() => Int, { nullable: true })
  followingCount: number;

  @Field(() => Int, { nullable: true })
  mediaCount: number;
}
