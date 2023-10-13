import { Field, InputType } from '@nestjs/graphql';
import { MediaEnum } from 'src/shared/enums';

@InputType()
export class QueryInput {
  @Field(() => MediaEnum)
  mediaType: MediaEnum;

  @Field()
  query: string;
}
