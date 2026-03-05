import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from './interfaces/comment.interface';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';
import { formatDate } from '../../common/utils/date.util';

/**
 * Service ใช้จัดการ logic ของ comment
 */
@Injectable()
export class CommentsService {

  /**
   * mock database (array)
   */
  private comments: Comment[] = [];

  /**
   * ดึง comment ของ post
   */
  findByPostId(postId: string): Comment[] {

    return this.comments.filter(
      (comment) => comment.postId === postId
    );

  }

  /**
   * สร้าง comment
   */
  create(dto: CreateCommentDto): Comment {

    const comment: Comment = {
      id: Date.now().toString(),
      ...dto,
      createdAt: formatDate(new Date())
    };

    this.comments.push(comment);

    return comment;
  }

  /**
   * แก้ไข comment
   */
  update(id: string, dto: UpdateCommentDto): Comment {

    const index = this.comments.findIndex(
      c => c.id === id
    );

    if (index === -1) {
      throw new NotFoundException('Comment not found');
    }

    this.comments[index] = {
      ...this.comments[index],
      ...dto
    };

    return this.comments[index];
  }

  /**
   * ลบ comment
   */
  remove(id: string) {

    const index = this.comments.findIndex(
      c => c.id === id
    );

    if (index === -1) {
      throw new NotFoundException('Comment not found');
    }

    this.comments.splice(index, 1);
  }

}