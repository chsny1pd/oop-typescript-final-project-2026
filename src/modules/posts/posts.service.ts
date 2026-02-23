import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { formatDate } from '../../common/utils/date.util';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  findAll(): Post[] { return this.posts; }
  
  findOne(id: string): Post {
    const post = this.posts.find(p => p.id === id);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  create(dto: CreatePostDto): Post {
    const newPost: Post = { id: Date.now().toString(), ...dto, createdAt: formatDate(new Date()),likes: 0 };
    this.posts.push(newPost);
    return newPost;
  }

  remove(id: string): void {
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) throw new NotFoundException('Post not found');
    this.posts.splice(index, 1);
  }
  
  update(id: string, dto: Partial<CreatePostDto>): Post {
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
