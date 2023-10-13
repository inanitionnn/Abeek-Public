import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class BanUserInput {
  @IsString()
  @Field()
  readonly userId: string;

  @IsString()
  @Field()
  readonly banReason: string;
}
