import { Field, InputType } from '@nestjs/graphql';
import { WarningEnum, WarningObjectEnum } from 'src/shared/enums';

@InputType()
export class WarningInput {
  @Field()
  userId: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  mediaId?: string;

  @Field(() => WarningEnum)
  warning: WarningEnum;

  @Field(() => WarningObjectEnum)
  warningObject: WarningObjectEnum;
}
