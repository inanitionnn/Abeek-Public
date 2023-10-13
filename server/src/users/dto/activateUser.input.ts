import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class ActivateUserInput {
  @IsString()
  @Field()
  readonly activationLink: string;
}
