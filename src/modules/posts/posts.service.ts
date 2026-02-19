import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';

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
    const newPost: Post = { id: Date.now().toString(), ...dto, createdAt: new Date() };
    this.posts.push(newPost);
    return newPost;
  }
}
