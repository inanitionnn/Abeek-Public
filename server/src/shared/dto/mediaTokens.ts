import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MediaTokens {
  @Field(() => Int)
  mediaTokens: number;

  @Field(() => Int)
  additionalMediaTokens: number;
}
