import { Controller, Get, Post, Body, Param, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Users') // จัดกลุ่มสำหรับ Swagger
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

@Post()
  @ApiOperation({ summary: 'สร้างผู้ใช้งานใหม่' })
  create(@Body() user: User): ApiResponse<User> {
    try {
      const newUser = this.usersService.create(user);
      return {
        success: true,
        message: 'สร้างผู้ใช้งานสำเร็จ',
        data: newUser,
      };
    } catch (error) {
      // ป้องกัน Error 500 ดิบๆ โดยส่งข้อความที่เราคุมเอง
      throw new InternalServerErrorException('ไม่สามารถสร้างผู้ใช้งานได้ในขณะนี้');
    }
  }

  @Get()
  @ApiOperation({ summary: 'ดึงข้อมูลผู้ใช้งานทั้งหมด' })
  findAll(): ApiResponse<User[]> {
    const users = this.usersService.findAll();
    return {
      success: true,
      message: 'ดึงข้อมูลผู้ใช้งานทั้งหมดสำเร็จ',
      data: users,
    };
  }

  @Get(':username')
  @ApiOperation({ summary: 'ค้นหาผู้ใช้งานด้วย username' })
  findByUsername(@Param('username') username: string): ApiResponse<User> {
    const user = this.usersService.findByUsername(username);

    // ดักจับกรณีไม่พบข้อมูล เพื่อส่ง HTTP 404 ตามเกณฑ์
    if (!user) {
      throw new NotFoundException(ไม่พบผู้ใช้งานชื่อ ${username});
    }

    return {
      success: true,
      message: 'ค้นหาผู้ใช้งานสำเร็จ',
      data: user,
    };
  }
}