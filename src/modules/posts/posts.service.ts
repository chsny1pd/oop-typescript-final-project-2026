import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Post } from './interfaces/post.interface';
import { CreatePostDto, UpdatePostDto } from './dto/create-post.dto'; 
import { formatDate } from '../../common/utils/date.util'; 

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  findAll(): Post[] { 
    return this.posts; 
  }
  
  findOne(id: string): Post {
    const post = this.posts.find(p => p.id === id);
    // ใช้ 404 เมื่อหาไอดีไม่เจอ
    if (!post) throw new NotFoundException(`ไม่พบโพสต์ไอดี: ${id}`); 
    return post; 
  }

  create(dto: CreatePostDto): Post {
    try {
      const newPost: Post = { 
        id: Date.now().toString(), 
        ...dto, 
        createdAt: formatDate(new Date()), 
        likes: 0 
      }; 
      this.posts.push(newPost);
      return newPost;
    } catch (error) {
      // ป้องกัน Error 500 จาก Logic ภายใน
      throw new InternalServerErrorException('เกิดข้อผิดพลาดในการสร้างโพสต์');
    }
  }

  replace(id: string, dto: UpdatePostDto): Post {
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) throw new NotFoundException('ไม่พบโพสต์ที่ต้องการอัปเดต');

    this.posts[index] = {
      ...this.posts[index],
      title: dto.title ?? this.posts[index].title,
      content: dto.content ?? this.posts[index].content,
      status: dto.status ?? this.posts[index].status,
    };
    return this.posts[index];
  }

  remove(id: string): void {
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) throw new NotFoundException('ไม่พบโพสต์ที่ต้องการลบ');
    this.posts.splice(index, 1);
  }
  
  update(id: string, dto: UpdatePostDto): Post {
    const post = this.findOne(id);
    Object.assign(post, dto);
    return post;
  }

  likePost(id: string): number {
    const post = this.findOne(id);
    post.likes = (post.likes || 0) + 1;
    return post.likes;
  }
}