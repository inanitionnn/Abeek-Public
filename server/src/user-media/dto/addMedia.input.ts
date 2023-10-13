import { Field, InputType, Int } from '@nestjs/graphql';
import { MediaEnum, WatchedEnum } from 'src/shared/enums';

@InputType()
export class AddMediaInput {
  @Field(() => MediaEnum)
  mediaType: MediaEnum;

  @Field()
  mediaId: string;

  @Field(() => String, { nullable: true })
  note: string;

  @Field(() => WatchedEnum, { nullable: true })
  watched: WatchedEnum;

  @Field(() => Int, { nullable: true })
  rate: number;
}
