import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class AuthSuccessResponse {
  @Field((type) => Boolean)
  success: boolean;
}
