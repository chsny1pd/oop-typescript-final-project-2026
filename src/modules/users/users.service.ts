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

  /**
   * GET ALL
   */
  findAll(): UserResponseDto[] {
    return this.users.map(user => this.toResponse(user));
  }

  /**
   * GET ONE
   */
  findOne(id: number): UserResponseDto {

    const user = this.users.find(u => u.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toResponse(user);
  }

  /**
   * CREATE
   */
  create(dto: CreateUserDto): UserResponseDto {

    const newUser: User = {
      id: Date.now(),
      username: dto.username,
      password: dto.password,
      createdAt: new Date().toISOString()
    };

    this.users.push(newUser);

    return this.toResponse(newUser);
  }

  /**
   * UPDATE
   */
  update(id: number, dto: UpdateUserDto): UserResponseDto {

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
  remove(id: number): { message: string } {

    const index = this.users.findIndex(u => u.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    this.users.splice(index, 1);

    return { message: 'User deleted' };
  }

}