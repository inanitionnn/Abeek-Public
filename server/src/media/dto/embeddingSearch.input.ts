import { Field, InputType, Int } from '@nestjs/graphql';
import { MediaEnum } from 'src/shared/enums';

@InputType()
export class EmbeddingSearchInput {
  @Field(() => MediaEnum)
  mediaType: MediaEnum;

  @Field()
  message: string;

  @Field(() => Int)
  count: number;
}
