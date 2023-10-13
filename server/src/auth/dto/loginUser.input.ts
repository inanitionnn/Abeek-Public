import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
  @Field()
  readonly email: string;

  @Field()
  readonly password: string;
}
