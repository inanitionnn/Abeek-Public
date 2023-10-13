import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FollowResponse {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  picture: string;
}
