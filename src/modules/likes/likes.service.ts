import { Injectable } from '@nestjs/common';
import { Like } from './interfaces/like.interface';

/**
 * Service จัดการ like
 */

@Injectable()
export class LikesService {

  /**
   * mock database
   */
  private likes: Like[] = [];

  /**
   * กด like
   */
  like(postId: string, userId: string) {

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