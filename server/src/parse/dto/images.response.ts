import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MediaTokens } from 'src/shared/dto';

@ObjectType()
export class ImagesResponse extends MediaTokens {
  @Field(() => [String], { nullable: true })
  links: string[];
}
