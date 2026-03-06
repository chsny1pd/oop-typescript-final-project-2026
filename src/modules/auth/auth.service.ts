import { Injectable } from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

/**
 * Service สำหรับ logic authentication
 */
@Injectable()
export class AuthService {

  /**
   * mock database
   */
  private users = [
    {
      id: 1,
      username: 'admin',
      password: '1234'
    }
  ];

  /**
   * register user ใหม่
   */
  register(dto: RegisterDto) {

    const existingUser = this.users.find(
      u => u.username === dto.username
    );

    if (existingUser) {
      return {
        success: false,
        message: 'Username already exists'
      };
    }

    const newUser = {
      id: Date.now(),
      username: dto.username,
      password: dto.password
    };

    this.users.push(newUser);

    return {
      success: true,
      message: 'Register success',
      user: {
        id: newUser.id,
        username: newUser.username
      }
    };

  }

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
      user: {
        id: user.id,
        username: user.username
      }
    };

  }

}