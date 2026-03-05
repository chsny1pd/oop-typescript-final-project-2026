import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';

/**
 * Controller สำหรับจัดการ API authentication
 */
@Controller('auth')
export class AuthController {

  /**
   * inject AuthService
   */
  constructor(
    private readonly authService: AuthService
  ) {}

  /**
   * POST /auth/login
   * ใช้สำหรับ login
   */
  @Post('login')
  login(@Body() dto: LoginDto) {

    return this.authService.login(dto);

  }

}