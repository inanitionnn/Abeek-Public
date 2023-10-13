import { Field, InputType } from '@nestjs/graphql';
import { MediaEnum } from 'src/shared/enums';

@InputType()
export class GetMediaInput {
  @Field(() => MediaEnum, { nullable: true })
  mediaType: MediaEnum;

  @Field({ nullable: true })
  mediaId: string;

  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  followId?: string;
}
