import { Field, InputType, Int } from '@nestjs/graphql';
import { MediaEnum } from 'src/shared/enums';

@InputType()
export class ImagesInput {
  @Field(() => MediaEnum)
  mediaType: MediaEnum;

  @Field()
  query: string;

  @Field(() => Int)
  count: number;
}
