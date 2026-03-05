import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

/**
 * Module สำหรับจัดการ users
 */

@Module({
  providers: [UsersService],
  exports: [UsersService], 
  // export เพื่อให้ module อื่นเรียกใช้ service ได้ เช่น auth
})
export class UsersModule {}