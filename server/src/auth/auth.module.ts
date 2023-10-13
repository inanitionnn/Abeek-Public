import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokensService } from './tokens/tokens.service';
import { MailService } from './mail/mail.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { ActivatedGuard } from './mail/activate.guard';
import { AuthResolver } from './auth.resolver';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { DbModule } from 'src/db/db.module';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MailerModule } from '@nestjs-modules/mailer';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    DbModule,
    NotificationsModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        tls: {
          ciphers: 'SSLv3',
        },
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthResolver,
    TokensService,
    MailService,
    LocalStrategy,
    ActivatedGuard,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    GoogleStrategy,
  ],
})
export class AuthModule {}
