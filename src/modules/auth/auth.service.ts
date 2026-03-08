import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service'; // นำเข้า UsersService
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  // เปลี่ยนมาฉีด UsersService เข้ามาใช้งานแทน Array ตัวเอง
  constructor(private readonly usersService: UsersService) {}

  register(dto: RegisterDto) {
    try {
      // 1. ตรวจสอบว่ามี User นี้หรือยังผ่าน UsersService
      const existingUser = this.usersService.findByUsername(dto.username);
      if (existingUser) {
        throw new ConflictException('Username already exists');
      }

      // 2. สร้าง User ใหม่ผ่าน UsersService
      const newUser = this.usersService.registerUser(dto)

      return {
        success: true,
        message: 'Register success',
        user: { id: newUser.id, username: newUser.username }
      };
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new InternalServerErrorException('เกิดข้อผิดพลาดในการสมัครสมาชิก');
    }
  }

  login(dto: LoginDto) {
    try {
      // 3. ตรวจสอบการ Login โดยดึงข้อมูลจาก UsersService
      const user = this.usersService.findByUsername(dto.username);

      if (!user || user.password !== dto.password) {
        throw new UnauthorizedException('Username or Password incorrect');
      }

      return {
        success: true,
        message: 'Login success',
        user: { id: user.id, username: user.username }
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
  }
}