import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/shared/dto';

@ObjectType()
export class ModerReportNoteResponse {
  @Field()
  reportId: string;

  @Field(() => User, { nullable: true })
  reportedUser: User;

  @Field(() => User, { nullable: true })
  informerUser: User;

  @Field({ nullable: true })
  mediaId: string;

  @Field({ nullable: true })
  note: string;
}
