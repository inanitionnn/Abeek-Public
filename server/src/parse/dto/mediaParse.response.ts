import { Field, ObjectType } from '@nestjs/graphql';
import { MediaTokens } from 'src/shared/dto';
import MediaParseType from '../types/mediaParseType';
@ObjectType()
export class MediaParseResponse extends MediaTokens {
  @Field(() => MediaParseType)
  media: typeof MediaParseType;
}
