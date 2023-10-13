import { Field, InputType } from '@nestjs/graphql';
import { MediaEnum } from 'src/shared/enums';

@InputType()
export class SearchInput {
  @Field(() => MediaEnum)
  mediaType: MediaEnum;

  @Field(() => String)
  query: string;
}
