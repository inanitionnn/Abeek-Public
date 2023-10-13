import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class ResetPasswordInput {
  @Field()
  resetLink: string;

  @MinLength(4)
  @Field()
  password: string;
}
