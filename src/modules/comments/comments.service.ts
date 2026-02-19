import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from './interfaces/comment.interface';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  private comments: Comment[] = [];

  // ดึงคอมเมนต์ทั้งหมดตาม Id ของโพสต์
  findByPostId(postId: string): Comment[] {
    return this.comments.filter((c) => c.postId === postId);
  }

  // สร้างคอมเมนต์ใหม่
  create(dto: CreateCommentDto): Comment {
    const newComment: Comment = {
      id: Date.now().toString(),
      ...dto,
      createdAt: new Date(),
    };
    this.comments.push(newComment);
    return newComment;
  }

  // ลบคอมเมนต์
  remove(id: string): void {
    const index = this.comments.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException('ไม่พบคอมเมนต์ที่ต้องการลบ');
    this.comments.splice(index, 1);
  }
} 

