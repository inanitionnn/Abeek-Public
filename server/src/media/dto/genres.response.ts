import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GenresResponse {
  @Field(() => [String], { nullable: true })
  genres: string[];
}
