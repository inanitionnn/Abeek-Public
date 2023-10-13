import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../shared/dto/user';
import { RolesEnum } from 'src/shared/enums';

@ObjectType()
export class UserResponse {
  @Field((type) => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field(() => RolesEnum)
  role: RolesEnum;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.role = user.role;
    this.name = user.name;
  }
}
