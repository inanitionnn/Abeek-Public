import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class ActivatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    if (user.isActivated) {
      return true;
    }
    return false;
  }
}
