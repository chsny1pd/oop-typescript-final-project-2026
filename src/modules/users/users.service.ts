import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

/**
 * Service สำหรับจัดการ user
 */

@Injectable()
export class UsersService {

  /**
   * mock database
   */
  private users: User[] = [];

  /**
   * สร้าง user
   */
  create(user: User) {

    this.users.push(user);

    return user;
  }

  /**
   * หา user จาก username
   */
  findByUsername(username: string) {

    return this.users.find(
      (u) => u.username === username
    );

  }

  /**
   * ดึง users ทั้งหมด
   */
  findAll() {

    return this.users;

  }

}