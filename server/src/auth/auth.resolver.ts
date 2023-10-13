import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Logger, UseGuards } from '@nestjs/common';
import {
  AuthResponse,
  LoginUserInput,
  RegistrationInput,
  ResetPasswordInput,
  TokenResponse,
} from './dto';
import { SuccessResponse } from 'src/shared/dto';
import { GqlLocalGuard, GqlRefreshGuard } from './guards';
import { Cron, CronExpression } from '@nestjs/schedule';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger(AuthResolver.name);

  @Cron(CronExpression.EVERY_WEEK)
  async deleteBannedAccounts() {
    this.logger.log('Deleting banned accounts');
    await this.authService.deleteBannedAccounts();
  }

  @Cron(CronExpression.EVERY_WEEK)
  async deleteBannedAcounts() {
    this.logger.log('Deleting not activated accounts');
    await this.authService.deleteNotActivatedAcounts();
  }

  @Mutation((returns) => SuccessResponse)
  async forgotPassword(@Args('email') email: string): Promise<SuccessResponse> {
    this.logger.log('Forgot password...');
    this.logger.verbose(`Email: (${email})`);
    return await this.authService.forgotPassword(email);
  }

  @Mutation((returns) => SuccessResponse)
  async resetPassword(
    @Args('resetPasswordInput') resetPasswordInput: ResetPasswordInput,
  ): Promise<SuccessResponse> {
    this.logger.log('Reset password...');
    this.logger.verbose(
      `Password: (${resetPasswordInput.password}). Link: (${resetPasswordInput.resetLink})`,
    );
    return await this.authService.resetPassword(resetPasswordInput);
  }

  @Mutation((returns) => AuthResponse)
  async activate(
    @Context() context,
    @Args('link') link: string,
  ): Promise<AuthResponse> {
    this.logger.log('Activation...');
    this.logger.verbose(`Link: (${link})`);
    const { req, res } = context;
    return await this.authService.activate(link, req, res);
  }

  @Mutation((returns) => SuccessResponse)
  async registration(
    @Args('registrationInput')
    registrationInput: RegistrationInput,
  ): Promise<SuccessResponse> {
    this.logger.log('Registration...');
    this.logger.verbose(
      `Name: (${registrationInput.name}). Email: (${registrationInput.email}. Password: (${registrationInput.password}))`,
    );
    return await this.authService.registration(registrationInput);
  }

  @Mutation((returns) => AuthResponse)
  @UseGuards(GqlLocalGuard)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ): Promise<AuthResponse> {
    this.logger.log('Login...');
    this.logger.verbose(
      `Email: (${loginUserInput.email}. Password: (${loginUserInput.password}))`,
    );
    const { req, res } = context;
    return await this.authService.login(req, res);
  }

  @Mutation((returns) => SuccessResponse)
  async logout(@Context() context): Promise<SuccessResponse> {
    this.logger.log('Logout...');
    const { req, res } = context;
    return await this.authService.logout(req, res);
  }

  @Mutation((returns) => TokenResponse)
  @UseGuards(GqlRefreshGuard)
  async refresh(@Context() context): Promise<TokenResponse> {
    this.logger.log('Refresh...');
    const { req, res } = context;
    return await this.authService.refresh(req, res);
  }

  // @Query((returns) => AuthResponse)
  // async getGoogleUser(@Context() context): Promise<AuthResponse> {
  //   const { req, res } = context;
  //   return await this.authService.getGoogleUser(req, res);
  // }

  // @Query((returns) => SuccessResponse)
  // @UseGuards(AuthGuard('google'))
  // google(): SuccessResponse {
  //   return { success: true };
  // }

  // @Query((returns) => SuccessResponse)
  // @UseGuards(AuthGuard('google'))
  // async googleCallback(@Context() context): Promise<SuccessResponse> {
  //   const { req, res } = context;
  //   return await this.authService.google(req, res);
  // }
}
