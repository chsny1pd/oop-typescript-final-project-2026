import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';

/**
 * Module สำหรับ likes
 */

@Module({
  providers: [LikesService],
  exports: [LikesService],
})
export class LikesModule {}