import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ForbiddenError } from 'src/shared/errors';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BanGuard implements CanActivate {
  constructor(private userService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const graphqlContext = GqlExecutionContext.create(context);
    const { req } = graphqlContext.getContext();

    if (req?.user) {
      const { id } = req.user;
      const user = await this.userService.getUserById(id);

      if (user.isBanned) {
        throw new ForbiddenError('You are banned');
      }
    }

    return true;
  }
}
