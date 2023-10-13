import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetFollowInput {
  @Field()
  followId: string;

  @Field({ nullable: true })
  userId: string;
}
