import { Field, ID, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class TokenResponse {
  @Field((type) => ID)
  token: string;
}
