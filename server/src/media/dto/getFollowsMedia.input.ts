import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetFollowsMediaInput {
  @Field(() => Int)
  count: number;

  @Field(() => Int, { nullable: true })
  page: number;
}
