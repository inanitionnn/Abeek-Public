import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Length, MinLength } from 'class-validator';

@InputType()
export class RegistrationInput {
  @Length(1, 25)
  @Field()
  readonly name: string;

  @IsEmail()
  @Field()
  readonly email: string;

  @MinLength(4)
  @Field()
  readonly password: string;
}
