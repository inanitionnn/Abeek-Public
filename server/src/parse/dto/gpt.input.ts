import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { MediaEnum } from 'src/shared/enums';

@InputType()
export class GptInput {
  @Field(() => MediaEnum)
  mediaType?: MediaEnum;

  @Field(() => Boolean, { nullable: true })
  isAfter2021?: boolean;

  @Field(() => Boolean, { nullable: true })
  isAllFields?: boolean;

  @Field(() => Boolean, { nullable: true })
  isJson?: boolean;

  @Field()
  query?: string;

  @Field(() => [String], { nullable: true })
  keys?: string[];
}
