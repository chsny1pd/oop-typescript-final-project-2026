import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiResponse } from '../../common/interfaces/api-response.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAll(): ApiResponse<any[]> {
    return { success: true, message: 'Success', data: this.postsService.findAll() };
  }

  @Post()
  create(@Body() dto: CreatePostDto): ApiResponse<any> {
    return { success: true, message: 'Created', data: this.postsService.create(dto) };
  }
}
