import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch
} from '@nestjs/common';

import { CommentsService } from './comments.service';
import {
  CreateCommentDto,
  UpdateCommentDto
} from './dto/comment.dto';

/**
 * Controller สำหรับ API comments
 */

@Controller('comments')
export class CommentsController {

  constructor(
    private readonly commentsService: CommentsService
  ) {}

  /**
   * GET comments ของ post
   *
   * GET /comments/post/:postId
   */
  @Get('post/:postId')
  findByPost(@Param('postId') postId: string) {

    return this.commentsService.findByPostId(postId);

  }

  /**
   * POST สร้าง comment
   */
  @Post()
  create(@Body() dto: CreateCommentDto) {

    return this.commentsService.create(dto);

  }

  /**
   * PATCH แก้ comment
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCommentDto
  ) {

    return this.commentsService.update(id, dto);

  }

  /**
   * DELETE comment
   */
  @Delete(':id')
  remove(@Param('id') id: string) {

    return this.commentsService.remove(id);

  }

}