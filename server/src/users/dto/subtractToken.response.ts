import { Field, ObjectType } from '@nestjs/graphql';
import { MediaTokens } from 'src/shared/dto';

@ObjectType()
export class SubtractTokenResponse extends MediaTokens {
  @Field(() => Boolean)
  access: boolean;
}
