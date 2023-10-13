import { Field, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { User } from '../../shared/dto/user';
import { NotificationEnum } from 'src/shared/enums';

@ObjectType()
class Follower extends PartialType(
  PickType(User, ['id', 'email', 'name', 'picture'] as const),
) {
  @Field(() => Boolean, { nullable: true })
  follow: boolean;
}

@ObjectType()
export class NotificationResponse {
  @Field()
  id: string;

  @Field(() => NotificationEnum)
  type: NotificationEnum;

  @Field()
  userId: string;

  @Field({ nullable: true })
  followerId: string;

  @Field(() => Follower, { nullable: true })
  follower: Follower;

  @Field({ nullable: true })
  notification: string;

  @Field(() => Boolean, { nullable: true })
  isWatched: boolean;

  @Field(() => Date, { nullable: true })
  createdAt: Date;
}
