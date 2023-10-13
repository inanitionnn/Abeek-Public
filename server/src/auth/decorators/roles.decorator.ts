import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from 'src/shared/enums';

export const Roles = (...roles: RolesEnum[]) => SetMetadata('roles', roles);
