import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @Get('google')
  // @UseGuards(AuthGuard('google'))
  // loginWithGoogle() {
  //   return;
  // }
  // @Get('google/callback')
  // @UseGuards(AuthGuard('google'))
  // async googleCallback(@Req() req, @Res() res) {
  //   await this.authService.google(req, res);
  // }
}
