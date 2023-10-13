import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReportsCountResponse {
  @Field(() => Int, { nullable: true })
  account: number;

  @Field(() => Int, { nullable: true })
  media: number;

  @Field(() => Int, { nullable: true })
  note: number;
}
