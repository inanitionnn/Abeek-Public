import { Field, ObjectType } from '@nestjs/graphql';
import { MediaModerType } from '../types';
import { User } from 'src/shared/dto';
import { CreatedEnum } from 'src/shared/enums';

@ObjectType()
export class MediaReportResponse {
  @Field(() => MediaModerType)
  media: typeof MediaModerType;

  @Field(() => User, { nullable: true })
  creator: User;

  @Field(() => User, { nullable: true })
  informer: User;

  @Field(() => CreatedEnum, { nullable: true })
  createdType: CreatedEnum;

  @Field({ nullable: true })
  reportId: string;

  @Field({ nullable: true })
  report: string;
}
