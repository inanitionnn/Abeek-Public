import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class RefreshToken {
  @IsString()
  @Field((type) => ID)
  userId: string;

  @IsString()
  @Field((type) => ID)
  token: string;

  @IsString()
  @Field((type) => ID)
  uniqueId: string;

  @Field((type) => Date)
  updatedAt: Date;
}
