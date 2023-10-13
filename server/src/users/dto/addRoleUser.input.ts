import { Field, InputType } from '@nestjs/graphql';
import { RolesEnum } from 'src/shared/enums';

@InputType()
export class AddRoleUserInput {
  @Field()
  userEmail: string;

  @Field(() => RolesEnum)
  role: RolesEnum;
}
