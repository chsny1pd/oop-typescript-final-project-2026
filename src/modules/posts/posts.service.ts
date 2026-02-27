import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/post.interface'; //
import { CreatePostDto } from './dto/create-post.dto'; //
import { formatDate } from '../../common/utils/date.util'; //

@Injectable()
export class PostsService {
  private posts: Post[] = []; //

  // ระบุชัดเจนว่าคืนค่าเป็น Array ของ Post
  findAll(): Post[] { 
    return this.posts; //
  }
  
  // ระบุชัดเจนว่าคืนค่าเป็น Post 1 อัน
  findOne(id: string): Post {
    const post = this.posts.find(p => p.id === id); //
    if (!post) throw new NotFoundException('Post not found'); //
    return post; //
  }

  create(dto: CreatePostDto): Post {
    // พ่อครัวปรุงอาหารตามใบสั่ง (dto) แล้วเติม ID กับวันที่
    const newPost: Post = { 
      id: Date.now().toString(), 
      ...dto, 
      createdAt: formatDate(new Date()), 
      likes: 0 
    }; 
    this.posts.push(newPost); //
    return newPost; //
  }

  // void หมายถึงฟังก์ชันนี้ทำงานเสร็จแล้วไม่ต้องส่งค่าอะไรกลับ (เพราะลบไปแล้ว)
  remove(id: string): void {
    const index = this.posts.findIndex(p => p.id === id); //
    if (index === -1) throw new NotFoundException('Post not found'); //
    this.posts.splice(index, 1); //
  }
  
  update(id: string, dto: Partial<CreatePostDto>): Post {
    const post = this.findOne(id); // ใช้ฟังก์ชัน findOne ที่เราเขียนไว้มาช่วยหา
    Object.assign(post, dto); // นำข้อมูลใหม่ใน dto ไปทับข้อมูลเดิม
    return post; //
  }

  likePost(id: string): number {
    const post = this.findOne(id); //
    post.likes = (post.likes || 0) + 1; // เพิ่มจำนวนไลก์
    return post.likes; // ส่งแค่ตัวเลขจำนวนไลก์กลับไป
  }
}