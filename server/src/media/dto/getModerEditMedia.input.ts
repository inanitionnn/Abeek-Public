import { Field, InputType } from '@nestjs/graphql';
import { MediaEnum } from 'src/shared/enums';

@InputType()
export class GetModerEditMediaInput {
  @Field(() => MediaEnum)
  mediaType: MediaEnum;

  @Field()
  mediaId: string;
}
