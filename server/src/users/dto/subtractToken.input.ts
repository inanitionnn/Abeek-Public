import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class SubtractTokenInput {
  @IsString()
  @Field()
  readonly userId: string;

  @IsNumber()
  @Field()
  readonly tokenCost: number;
}
