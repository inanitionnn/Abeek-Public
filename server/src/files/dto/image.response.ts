import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class ImageResponse {
  @Field()
  link: string;
}
