import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';

@Controller('posts')
export class PostsController {

  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreatePostDto) {
    return this.postsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    return this.postsService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}