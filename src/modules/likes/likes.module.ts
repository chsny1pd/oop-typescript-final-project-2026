import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller'
/**
 * Module สำหรับ likes
 */

@Module({
  controllers:[LikesController],
  providers: [LikesService],
  exports: [LikesService],
})
export class LikesModule {}