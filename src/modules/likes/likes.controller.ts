import { Controller, Post, Delete, Get, Param, Body, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { LikesService } from './likes.service';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { Like } from './interfaces/like.interface';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @ApiOperation({ summary: 'กดถูกใจโพสต์' })
  like(
    @Body('postId') postId: string,
    @Body('userId') userId: string,
  ): ApiResponse<Like> {
    // ตรวจสอบข้อมูลเบื้องต้นก่อนส่งไป Service
    if (!postId || !userId) {
      throw new BadRequestException('กรุณาระบุ postId และ userId ให้ครบถ้วน');
    }

    try {
      const result = this.likesService.like(postId, userId);
      return {
        success: true,
        message: 'กดถูกใจสำเร็จ',
        data: result,
      };
    } catch (error) {
      throw new InternalServerErrorException('เกิดข้อผิดพลาดในการกดถูกใจ');
    }
  }

@Delete()
  @ApiOperation({ summary: 'ยกเลิกการกดถูกใจ' })
  unlike(
    @Body('postId') postId: string,
    @Body('userId') userId: string,
  ): ApiResponse<null> {
    try {
      this.likesService.unlike(postId, userId);
      return {
        success: true,
        message: 'ยกเลิกการกดถูกใจสำเร็จ',
        data: null,
      };
    } catch (error) {
      throw new InternalServerErrorException('ไม่สามารถยกเลิกการถูกใจได้');
    }
  }

@Get('count/:postId')
  @ApiOperation({ summary: 'ดูจำนวนการถูกใจของโพสต์' })
  count(@Param('postId') postId: string): ApiResponse<number> {
    try {
      // 1. ตรวจสอบเบื้องต้นว่ามีการส่ง postId มาจริงไหม
      if (!postId) {
        throw new BadRequestException('กรุณาระบุ postId ที่ต้องการตรวจสอบ');
      }

      const total = this.likesService.count(postId);
      
      return {
        success: true,
        message: 'ดึงจำนวนการถูกใจสำเร็จ',
        data: total,
      };
    } catch (error) {
      // 2. ป้องกัน Error 500 ดิบๆ หาก Logic ใน Service มีปัญหา
      throw new InternalServerErrorException('ไม่สามารถดึงข้อมูลจำนวนการถูกใจได้ในขณะนี้');
    }
  }
}