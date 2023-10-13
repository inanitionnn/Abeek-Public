import { Injectable, Logger } from '@nestjs/common';
import { MailService } from './mail/mail.service';
import { TokensService } from './tokens/tokens.service';
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import {
  AuthResponse,
  RegistrationInput,
  ResetPasswordInput,
  TokenResponse,
} from './dto';
import { SuccessResponse, User } from 'src/shared/dto';
import { ForbiddenError } from '@nestjs/apollo';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from 'src/shared/errors';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationEnum } from 'src/shared/enums';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private notificationsService: NotificationsService,
    private tokensService: TokensService,
    private mailService: MailService,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  public async deleteBannedAccounts() {
    this.logger.log('Delete not activated accounts (start)');
    const emails = await this.userService.deleteBannedAccounts();
    await this.mailService.sendWeDeleteYourAccountMail(
      emails,
      'Your account was blocked a 3 months ago, but you never contacted the moderator team. Therefore, your account has been deleted',
    );
    this.logger.log('Delete not activated accounts (end)');
  }

  public async deleteNotActivatedAcounts() {
    this.logger.log('Delete not activated accounts (start)');
    const emails = await this.userService.deleteNotActivatedAccounts();
    await this.mailService.sendWeDeleteYourAccountMail(
      emails,
      'You did not activate your account within a week, so it was deleted',
    );
    this.logger.log('Delete not activated accounts (end)');
  }

  public async activate(activationLink, req, res): Promise<AuthResponse> {
    this.logger.log('Activate (start)');
    const uniqueId = req.headers['x-fingerprint'];
    const user = await this.userService.activateUser(activationLink);
    await this.notificationsService.addNotification({
      type: NotificationEnum.tokens,
      userId: user.id,
      notification: 'You get 200 additional tokens for registration',
    });
    const notificationCount =
      await this.notificationsService.getNotificationCount(user.id);
    const tokens = await this.tokensService.generateTokens(
      user,
      uniqueId,
      notificationCount,
    );
    res.cookie('auth-cookie', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      domain: process.env.CLIENT_API,
    });

    const response = new AuthResponse(user, tokens.accessToken);
    this.logger.log('Activate (end)');
    return response;
  }

  public async registration(user: RegistrationInput): Promise<SuccessResponse> {
    this.logger.log('Registration (start)');
    const newUser = await this.userService.createUser(user);
    const activationLink = uuid.v4();
    await this.userService.saveActivationLink(newUser.id, activationLink);
    this.mailService.sendActivationMail(
      newUser.email,
      `https://${process.env.CLIENT_URL}/activate/${activationLink}`,
    );
    this.logger.log('Registration (end)');
    return { success: true };
  }

  public async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<User> {
    this.logger.log('Validate user credentials (start)');
    const user: User = await this.userService.getUserByEmail(email);
    if (!user) {
      this.logger.warn('User not found');
      throw new NotFoundError('User not found');
    }
    if (!user.password) {
      this.logger.warn(
        'Not found password. You may have signed up with Google',
      );
      throw new NotFoundError(
        'Not found password. You may have signed up with Google',
      );
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!user.isActivated) {
      this.logger.warn('Account in not activated');
      throw new ForbiddenError(
        'Account in not activated. Please check your email!',
      );
    }
    if (user.isBanned) {
      this.logger.warn('Account in banned');
      throw new ForbiddenError(
        'Your account has been banned. You can contact us by mail to unban it. Or your account will be deleted in a month',
      );
    }
    if (!isValidPassword) {
      this.logger.warn('Wrong password');
      throw new BadRequestError('Wrong password');
    }
    this.logger.log('Validate user credentials (end)');
    return user;
  }

  public async login(req, res): Promise<AuthResponse> {
    this.logger.log('Login (start)');
    const uniqueId = req.headers['x-fingerprint'];
    const notificationCount =
      await this.notificationsService.getNotificationCount(req.user.id);
    const tokens = await this.tokensService.generateTokens(
      req.user,
      uniqueId,
      notificationCount,
    );

    res.cookie('auth-cookie', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      domain: process.env.CLIENT_API,
      secure: true,
    });

    const response = new AuthResponse(req.user, tokens.accessToken);
    this.logger.log('Login (end)');
    return response;
  }

  public async refresh(req, res): Promise<TokenResponse> {
    this.logger.log('Refresh (start)');
    const uniqueId = req.headers['x-fingerprint'];
    const notificationCount =
      await this.notificationsService.getNotificationCount(req.user.id);
    const tokens = await this.tokensService.updateTokens(
      req.user,
      uniqueId,
      notificationCount,
    );
    this.logger.verbose(
      `Access token: (${tokens.accessToken}). Refresh token: (${tokens.refreshToken})`,
    );
    res.clearCookie('auth-cookie');
    res.cookie('auth-cookie', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      domain: process.env.CLIENT_API,
      secure: true,
    });
    this.logger.log('Refresh (end)');
    return { token: tokens.accessToken };
  }

  public async logout(req, res): Promise<SuccessResponse> {
    this.logger.log('Logout (start)');
    const token = req?.cookies['auth-cookie'];
    if (token) {
      await this.tokensService.deleteRefreshToken(token);
    }
    res.clearCookie('auth-cookie');
    this.logger.log('Logout (end)');
    return { success: true };
  }

  public async forgotPassword(email: string): Promise<SuccessResponse> {
    this.logger.log('Forgot password (start)');
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      this.logger.warn('Forgot password error');
      throw new NotFoundError('User not found');
    }
    if (!user.isActivated) {
      this.logger.warn('Forgot password error');
      throw new ForbiddenError('Account in not activated');
    }
    const resetLink = uuid.v4();
    await this.userService.saveResetPasswordLink(user.id, resetLink);
    this.mailService.sendResetPasswordMail(
      email,
      `https://${process.env.CLIENT_URL}/reset/${resetLink}`,
    );
    this.logger.log('Forgot password (end)');
    return { success: true };
  }

  public async resetPassword(
    dto: ResetPasswordInput,
  ): Promise<SuccessResponse> {
    this.logger.log('Reset password (start)');
    const { resetLink, password } = dto;
    const user = await this.userService.resetPassword(resetLink, password);
    if (!user) {
      this.logger.warn('Reset password error');
      throw new InternalServerError('Reset password error');
    }
    this.logger.log('Reset password (end)');
    return { success: true };
  }
}
