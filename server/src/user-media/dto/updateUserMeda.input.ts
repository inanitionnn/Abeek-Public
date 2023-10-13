import { Field, InputType, Int } from '@nestjs/graphql';
import { SeriesSeasonRateInput } from 'src/shared/dto';
import { WatchedEnum } from 'src/shared/enums';

@InputType()
export class UpdateUserMediaInput {
  @Field()
  mediaId: string;

  @Field(() => WatchedEnum, { nullable: true })
  watched?: WatchedEnum;

  @Field(() => Int, { nullable: true })
  rate?: number;

  @Field({ nullable: true })
  note?: string;

  @Field(() => [SeriesSeasonRateInput], { nullable: true })
  seasons?: SeriesSeasonRateInput[];
}
