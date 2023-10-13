import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/shared/dto';

@ObjectType()
export class AuthResponse {
  @Field((type) => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  picture: string;

  @Field()
  token: string;

  constructor(user: User, token: string) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.token = token;
    this.picture = user.picture;
  }
}
