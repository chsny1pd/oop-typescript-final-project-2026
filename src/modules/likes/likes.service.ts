import { Injectable } from '@nestjs/common';
import { Like } from './interfaces/like.interface';
import { PostsService } from '../posts/posts.service'


/**
 * Service จัดการ like
 */

@Injectable()
export class LikesService {

  /**
   * mock database
   */
  private likes: Like[] = [];

  constructor(private readonly postsService: PostsService) {}

  /**
   * กด like
   */
  like(postId: string, userId: string):Like {

    // ตรวจสอบก่อนว่า postId ที่ส่งมา มีโพสต์นั้นอยู่จริงไหม
    // ถ้าไม่เจอ เมธอด findOne ใน PostsService จะ throw 404 ให้อัตโนมัติ
    this.postsService.findOne(postId)

    // เช็กว่าเคย Like ไปหรือยัง (ป้องกันการกดซ้ำ)
    const existingLike = this.likes.find(l => l.postId === postId && l.userId === userId);
    if (existingLike) return existingLike

    const like: Like = {
      id: Date.now().toString(),
      postId,
      userId
    };

    this.likes.push(like);

    return like;
  }

  /**
   * unlike
   */
  unlike(postId: string, userId: string) {

    // ตรวจสอบโพสต์ก่อนเช่นกัน
    this.postsService.findOne(postId)

    this.likes = this.likes.filter(
      l => !(l.postId === postId && l.userId === userId)
    );

  }

  /**
   * จำนวน like
   */
  count(postId: string) {

    return this.likes.filter(
      l => l.postId === postId
    ).length;

  }

}