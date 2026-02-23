import { Controller, Get, Post, Body, Delete, Param, Patch } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return { success: true, data: this.postsService.findOne(id) };
  }

  @Post()
  create(@Body() dto: CreatePostDto): ApiResponse<any> {
    return { success: true, message: 'Created', data: this.postsService.create(dto) };
  }

  @Patch(':id') // สำหรับแก้ไข
  update(@Param('id') id: string, @Body() dto: Partial<CreatePostDto>) {
    return { success: true, message: 'แก้ไขสำเร็จ', data: this.postsService.update(id, dto) };
  }

  @Patch(':id/like')
  like(@Param('id') id: string) {
    const likes = this.postsService.likePost(id);
    return { success: true, message: 'กดไลก์แล้ว!', likes };
  }

  @Delete(':id') // สำหรับลบ (จุดที่คุณติด Error อยู่ตอนนี้)
  remove(@Param('id') id: string) {
    this.postsService.remove(id);
    return { success: true, message: 'ลบโพสต์สำเร็จ' };
  }
}

