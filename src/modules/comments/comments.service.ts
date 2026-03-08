import { Injectable, NotFoundException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Comment } from './interfaces/comment.interface';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';
import { PostsService } from '../posts/posts.service';
import { UsersService } from '../users/users.service';
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

  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
  ) {}

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

    // 1. ตรวจสอบว่า author มีชื่อผู้ใช้นี้อยู่ในระบบจริงไหม
    // ถ้าไม่เจอ จะ throw 401 Unauthorized ทันที
    const user = this.usersService.findByUsername(dto.author);
    if (!user) {
      throw new UnauthorizedException('Only registered users can comment. Please register first.');
    }

    // 2. ตรวจสอบก่อนว่า postId ที่ส่งมา มีโพสต์นั้นอยู่จริงไหม
    // ถ้าไม่เจอ เมธอด findOne ใน PostsService จะ throw NotFoundException (404) ทันที
    this.postsService.findOne(dto.postId);

    try {
      const comment: Comment = {
        id: Date.now().toString(),
        ...dto,
        createdAt: formatDate(new Date()),
      };

      this.comments.push(comment);
      return comment;
    } catch (error) {
      // 3. ป้องกัน Error 500 ดิบๆ ตามเกณฑ์คะแนน
      throw new InternalServerErrorException('ไม่สามารถบันทึกความคิดเห็นได้ในขณะนี้');
    }
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