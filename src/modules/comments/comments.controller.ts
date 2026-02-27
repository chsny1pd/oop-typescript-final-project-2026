import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'; // ✅ เพิ่ม Put
import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto } from './dto/create-comment.dto';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { Comment } from './interfaces/comment.interface';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() dto: CreateCommentDto): ApiResponse<Comment> {
    return {
      success: true,
      message: 'เพิ่มความคิดเห็นสำเร็จ',
      data: this.commentsService.create(dto),
    };
  }

  @Get('post/:postId')
  getByPost(@Param('postId') postId: string): ApiResponse<Comment[]> {
    return {
      success: true,
      message: 'ดึงข้อมูลความคิดเห็นสำเร็จ',
      data: this.commentsService.findByPostId(postId),
    };
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCommentDto,
  ): ApiResponse<Comment> {
    return {
      success: true,
      message: 'อัปเดตความคิดเห็นสำเร็จ',
      data: this.commentsService.update(id, dto),
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string): ApiResponse<null> {
    this.commentsService.remove(id);
    return {
      success: true,
      message: 'ลบความคิดเห็นสำเร็จ',
      data: null,
    };
  }
}
