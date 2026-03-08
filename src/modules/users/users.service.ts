import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

/**
 * Service สำหรับจัดการ logic ของ user
 */
@Injectable()
export class UsersService {

  /**
   * mock database
   */
  private users: User[] = [];

  /**
   * แปลง User → Response DTO
   */
  private toResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      username: user.username,
      createdAt: user.createdAt
    };
  }

  // ใช้ findByUsername เพื่อให้ AuthService ใช้งานได้
  findByUsername(username: string): User | undefined {
    return this.users.find(u => u.username === username);
  }

  /**
   * GET ALL
   */
  findAll(): UserResponseDto[] {
    return this.users.map(user => this.toResponse(user));
  }

  /**
   * GET ONE
   */
  findOne(id: string): UserResponseDto {

    const user = this.users.find(u => u.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toResponse(user);
  }

  /**
   * CREATE(ไว้เก็บ,บันทึกค่า)
   */
  create(user: User): User {
    this.users.push(user);
    return user;
  }

  // ฟังก์ชันใหม่ (เพื่อให้ Controller และ Auth เรียกใช้ง่ายๆ)
  registerUser(dto: CreateUserDto): User {
  const newUser: User = {
    id: Date.now().toString(), // สร้าง ID เป็น string ที่นี่
    ...dto,
    createdAt: new Date().toISOString(), // บันทึกวันที่
  };
  
  return this.create(newUser); // ส่งไปบันทึกผ่านฟังก์ชันหลัก
}

  /**
   * UPDATE
   */
  update(id: string, dto: UpdateUserDto): UserResponseDto {

    const user = this.users.find(u => u.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.username) user.username = dto.username;
    if (dto.password) user.password = dto.password;

    return this.toResponse(user);
  }

  /**
   * DELETE
   */
  remove(id: string): { message: string } {

    const index = this.users.findIndex(u => u.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    this.users.splice(index, 1);

    return { message: 'User deleted' };
  }

}