import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsEmail()
  @Field()
  readonly email: string;

  @IsString()
  @Field()
  readonly name: string;

  @IsString()
  @Field()
  readonly password: string;
}
