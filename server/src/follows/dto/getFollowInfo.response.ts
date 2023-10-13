import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class getFollowInfoResponse {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  picture: string;

  @Field({ nullable: true })
  note: string;

  @Field(() => Int, { nullable: true })
  filmCount: number;

  @Field(() => Int, { nullable: true })
  seriesCount: number;

  @Field(() => Int, { nullable: true })
  comicsCount: number;

  @Field(() => Int, { nullable: true })
  bookCount: number;

  @Field(() => Boolean, { nullable: true })
  follow: boolean;
}
