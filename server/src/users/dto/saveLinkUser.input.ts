import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class SaveLinkUserInput {
  @IsString()
  @Field()
  readonly userId: string;

  @IsString()
  @Field()
  readonly activationLink: string;
}
