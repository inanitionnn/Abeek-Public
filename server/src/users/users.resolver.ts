import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from '../shared/dto/user';
import { AddRoleUserInput, BanUserInput, UpdateUserInput } from './dto';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAccessGuard, RolesGuard } from 'src/auth/guards';
import { CurrentUser, Roles } from 'src/auth/decorators';
import { SuccessResponse } from 'src/shared/dto';
import { RolesEnum } from 'src/shared/enums';
import { WarningInput } from './dto/warning.input';
import { Cron, CronExpression } from '@nestjs/schedule';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  private readonly logger = new Logger(UsersResolver.name);

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async addDailyTokens() {
    this.logger.log('Adding daily tokens');
    await this.usersService.addDailyTokens();
  }

  @UseGuards(RolesGuard)
  @Roles(RolesEnum.Moder, RolesEnum.Admin)
  @UseGuards(GqlAccessGuard)
  @Mutation((returns) => SuccessResponse)
  async acceptWarning(
    @Args('warningInput') warningInput: WarningInput,
  ): Promise<SuccessResponse> {
    this.logger.log('Accept warning...');
    this.logger.verbose(
      `User id: (${warningInput.userId}). 
      Warning: (${warningInput.warning}).
      Warning object: (${warningInput.warningObject}).`,
    );
    const res = await this.usersService.acceptWarning(warningInput);
    return res;
  }

  @UseGuards(RolesGuard)
  @Roles(RolesEnum.Admin)
  @UseGuards(GqlAccessGuard)
  @Mutation((returns) => User)
  async addRole(
    @CurrentUser() user: User,
    @Args('addRoleUserInput') addRoleUserInput: AddRoleUserInput,
  ): Promise<User | null> {
    this.logger.log('Adding role to user...');
    const res = await this.usersService.addRoleToUser(user, addRoleUserInput);
    return res;
  }

  @UseGuards(RolesGuard)
  @Roles(RolesEnum.Admin)
  @UseGuards(GqlAccessGuard)
  @Mutation((returns) => User)
  async unbanUser(@Args('userEmail') userEmail: string): Promise<User | null> {
    this.logger.log('Banning user...');
    const res = await this.usersService.unbanUser(userEmail);
    return res;
  }

  @UseGuards(RolesGuard)
  @Roles(RolesEnum.Admin)
  @UseGuards(GqlAccessGuard)
  @Query((returns) => [User])
  async getAllUsers(): Promise<User[]> {
    this.logger.log('Banning user...');
    const res = await this.usersService.getAllUsers();
    return res;
  }

  @UseGuards(RolesGuard)
  @Roles(RolesEnum.Moder, RolesEnum.Admin)
  @UseGuards(GqlAccessGuard)
  @Mutation((returns) => User)
  async banUser(
    @Args('banUserInput') banUserInput: BanUserInput,
  ): Promise<User | null> {
    this.logger.log('Banning user...');
    this.logger.verbose(
      `User id: (${banUserInput.userId}). 
      Ban reason: (${banUserInput.banReason}).`,
    );
    const res = await this.usersService.banUser(
      banUserInput.userId,
      banUserInput.banReason,
    );
    return res;
  }

  @UseGuards(RolesGuard)
  @Roles(RolesEnum.Moder, RolesEnum.Admin)
  @UseGuards(GqlAccessGuard)
  @Mutation((returns) => User)
  async banReportsUser(@Args('userId') userId: string): Promise<User | null> {
    this.logger.log('Banning reports user...');
    const res = await this.usersService.banReportsUser(userId);
    return res;
  }

  @UseGuards(GqlAccessGuard)
  @Mutation((returns) => SuccessResponse)
  async updateUser(
    @CurrentUser() user: User,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<SuccessResponse> {
    this.logger.log('Creating user...');
    return await this.usersService.updateUser(user.id, updateUserInput);
  }
}
