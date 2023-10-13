import { Field, InputType, Int } from '@nestjs/graphql';
import { MediaEnum } from 'src/shared/enums';

@InputType()
export class GetNearestMediaInput {
  @Field(() => MediaEnum)
  mediaType: MediaEnum;

  @Field()
  mediaId: string;

  @Field(() => Int)
  count: number;
}
