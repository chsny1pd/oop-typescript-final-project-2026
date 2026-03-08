import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/post.interface';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { formatDate } from '../../common/utils/date.util';
import { UsersService } from '../users/users.service'

@Injectable()
export class PostsService {

  /**
   * mock database
   */
  private posts: Post[] = [];

  constructor(private readonly usersService: UsersService) {}

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: string): Post {
    const post = this.posts.find(p => p.id === id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  create(dto: CreatePostDto): Post {

    // ตรวจสอบว่าผู้เขียนมีตัวตนจริงไหม โดยเรียก findOne จาก UsersService
    // ถ้าไม่เจอ ผู้ใช้จะได้รับ Error 404 ทันทีจากฝั่ง UsersService
    this.usersService.findOne(dto.authorId);

    const post: Post = {
      id: Date.now().toString(),
      ...dto,
      likes: 0,
      createdAt: formatDate(new Date())
    }

    this.posts.push(post);

    return post;
  }

  update(id: string, dto: UpdatePostDto): Post {

    const post = this.findOne(id);

    Object.assign(post, dto);

    return post;
  }

  remove(id: string) {

    const index = this.posts.findIndex(p => p.id === id);

    if (index === -1) {
      throw new NotFoundException();
    }

    this.posts.splice(index, 1);
  }

}