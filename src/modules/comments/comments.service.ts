import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from './interfaces/comment.interface';
import { CreateCommentDto, UpdateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  private comments: Comment[] = [];

  findByPostId(postId: string): Comment[] {
    return this.comments.filter((c) => c.postId === postId);
  }

  create(dto: CreateCommentDto): Comment {
    const newComment: Comment = {
      id: Date.now().toString(),
      ...dto,
      createdAt: new Date(),
    };
    this.comments.push(newComment);
    return newComment;
  }

  update(id: string, dto: UpdateCommentDto): Comment {
    const index = this.comments.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException(`ไม่พบความคิดเห็น id: ${id}`);

    this.comments[index] = { ...this.comments[index], ...dto };
    return this.comments[index];
  }

  remove(id: string): void {
    const index = this.comments.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException('ไม่พบคอมเมนต์ที่ต้องการลบ');
    this.comments.splice(index, 1);
  }
}