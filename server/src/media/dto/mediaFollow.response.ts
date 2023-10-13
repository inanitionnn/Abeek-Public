import { Field, ObjectType } from '@nestjs/graphql';
import { FollowUser, UserMediaResponse } from 'src/shared/dto';
import { MediaBaseType } from '../types';

@ObjectType()
export class MediaFollowResponse {
  @Field(() => MediaBaseType, { nullable: true })
  media: typeof MediaBaseType;

  @Field(() => UserMediaResponse, { nullable: true })
  userMedia: UserMediaResponse;

  @Field(() => FollowUser, { nullable: true })
  user: FollowUser;
}
