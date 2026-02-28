import { Controller, Get, Post, Put, Body, Delete, Param, Patch } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './dto/create-post.dto';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { Post as PostEntity } from './interfaces/post.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAll(): ApiResponse<PostEntity[]> {
    return { success: true, message: 'Success', data: this.postsService.findAll() };
  }

  @Get(':id')
  findOne(@Param('id') id: string): ApiResponse<PostEntity> {
    return { success: true, message: 'Success', data: this.postsService.findOne(id) };
  }

  @Post() // จะให้ Status 201 Created โดยอัตโนมัติ
  create(@Body() dto: CreatePostDto): ApiResponse<PostEntity> {
    return { success: true, message: 'Created', data: this.postsService.create(dto) };
  }

  @Put(':id')
  replace(@Param('id') id: string, @Body() dto: UpdatePostDto): ApiResponse<PostEntity> {
    return { success: true, message: 'อัปเดตโพสต์สำเร็จ', data: this.postsService.replace(id, dto) };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePostDto): ApiResponse<PostEntity> {
    return { success: true, message: 'แก้ไขสำเร็จ', data: this.postsService.update(id, dto) };
  }

  @Patch(':id/like')
  like(@Param('id') id: string): ApiResponse<number> {
    const likes = this.postsService.likePost(id);
    return { success: true, message: 'กดไลก์แล้ว!', data: likes };
  }

  @Delete(':id')
  remove(@Param('id') id: string): ApiResponse<null> {
    this.postsService.remove(id);
    return { success: true, message: 'ลบโพสต์สำเร็จ', data: null };
  }
}