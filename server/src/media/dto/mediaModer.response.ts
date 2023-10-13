import { Field, ObjectType } from '@nestjs/graphql';
import { MediaBaseType, MediaModerType } from '../types';
import { User } from 'src/shared/dto';
import { CreatedEnum } from 'src/shared/enums';

@ObjectType()
export class MediaModerResponse {
  @Field(() => MediaModerType, { nullable: true })
  media: typeof MediaModerType;

  @Field(() => [MediaBaseType], { nullable: true })
  searchMedia: typeof MediaBaseType[];

  @Field(() => User, { nullable: true })
  creator: User;

  @Field(() => CreatedEnum, { nullable: true })
  createdType: CreatedEnum;

  @Field({ nullable: true })
  report: string;
}
