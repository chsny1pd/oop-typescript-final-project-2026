import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';

/**
 * Service สำหรับ logic authentication
 */
@Injectable()
export class AuthService {

  /**
   * mock users database
   */
  private users = [
    {
      id: '1',
      username: 'admin',
      password: '1234'
    }
  ];

  /**
   * login
   */
  login(dto: LoginDto) {

    const user = this.users.find(
      u => u.username === dto.username
    );

    if (!user) {

      return {
        success: false,
        message: 'User not found'
      };

    }

    if (user.password !== dto.password) {

      return {
        success: false,
        message: 'Password incorrect'
      };

    }

    return {
      success: true,
      message: 'Login success',
      user
    };

  }

}