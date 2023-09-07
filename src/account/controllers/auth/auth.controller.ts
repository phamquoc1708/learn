import { Body, Controller, Param, Post } from '@nestjs/common';
import { SignUpDto } from 'src/account/dtos/auth/signUp.dto';
import { AuthService } from 'src/account/services/auth/auth.service';

@Controller('auth/:side')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Param('side') side: string, @Body() payload: SignUpDto) {
    return this.authService.signUp(side, payload);
  }
}
