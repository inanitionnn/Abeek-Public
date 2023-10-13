import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RolesEnum } from 'src/shared/enums';
import { ForbiddenError } from 'src/shared/errors';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requireRoles = this.reflector.get<RolesEnum[]>(
      'roles',
      context.getHandler(),
    );

    if (!requireRoles) return true;

    const graphqlContext = GqlExecutionContext.create(context);
    const { req } = graphqlContext.getContext();

    if (req?.user) {
      const { id } = req.user;
      const user = await this.userService.getUserById(id);

      if (requireRoles.includes(user.role)) {
        return true;
      } else {
        throw new ForbiddenError('You do not have access');
      }
    }

    return false;
  }
}
