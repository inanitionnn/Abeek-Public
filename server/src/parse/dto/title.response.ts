import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MediaTokens } from 'src/shared/dto';

@ObjectType()
export class TitleResponse extends MediaTokens {
  @Field()
  title: string;

  @Field(() => Int, { nullable: true })
  year: number;
}
