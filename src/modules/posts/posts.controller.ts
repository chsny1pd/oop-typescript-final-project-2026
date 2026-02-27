import { Controller, Get, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { Post as PostEntity } from './interfaces/post.interface'; // นำเข้า Interface ของ Post

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  // เปลี่ยนจาก any[] เป็น PostEntity[] เพื่อบอกว่าส่งกลับเป็นรายการโพสต์หลายอัน
  getAll(): ApiResponse<PostEntity[]> {
    return { success: true, message: 'Success', data: this.postsService.findAll() };
  }

  @Get(':id')
  // ระบุประเภทการตอบกลับเป็น ApiResponse<PostEntity> สำหรับโพสต์เดียว
  findOne(@Param('id') id: string): ApiResponse<PostEntity> {
    return { success: true, message: 'Success', data: this.postsService.findOne(id) };
  }

  @Post()
  // เปลี่ยนจาก any เป็น PostEntity เพราะผลลัพธ์ที่สร้างเสร็จคือ 1 โพสต์
  create(@Body() dto: CreatePostDto): ApiResponse<PostEntity> {
    return { success: true, message: 'Created', data: this.postsService.create(dto) };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreatePostDto>): ApiResponse<PostEntity> {
    return { success: true, message: 'แก้ไขสำเร็จ', data: this.postsService.update(id, dto) };
  }

  @Patch(':id/like')
  // สำหรับ Like เราอาจจะส่งกลับเป็นตัวเลข (number) หรือตัวโพสต์ที่อัปเดตแล้วก็ได้
  like(@Param('id') id: string): ApiResponse<number> {
    const likes = this.postsService.likePost(id);
    return { success: true, message: 'กดไลก์แล้ว!', data: likes };
  }

  @Delete(':id')
  // สำหรับการลบ มักจะส่ง data เป็น null เพราะข้อมูลถูกลบไปแล้ว
  remove(@Param('id') id: string): ApiResponse<null> {
    this.postsService.remove(id);
    return { success: true, message: 'ลบโพสต์สำเร็จ', data: null };
  }
}