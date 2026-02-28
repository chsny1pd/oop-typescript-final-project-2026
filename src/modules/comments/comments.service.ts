import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Comment } from './interfaces/comment.interface';
import { CreateCommentDto, UpdateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  private comments: Comment[] = []; // เก็บข้อมูลใน Memory ตามโค้ดเดิมของคุณ

  // 1. ดึงความคิดเห็นตาม postId
  findByPostId(postId: string): Comment[] {
    return this.comments.filter((c) => c.postId === postId); //
  }

  // 2. สร้างความคิดเห็นใหม่ (เพิ่ม Try-Catch ป้องกัน Error 500)
  create(dto: CreateCommentDto): Comment {
    try {
      const newComment: Comment = {
        id: Date.now().toString(), // ใช้ Timestamp เป็น ID
        ...dto,
        createdAt: new Date(), //
      };
      this.comments.push(newComment);
      return newComment;
    } catch (error) {
      // หากเกิดเหตุไม่คาดฝัน ให้พ่น 500 แบบระบุข้อความเอง แทนการปล่อยให้ระบบล่ม
      throw new InternalServerErrorException('ไม่สามารถบันทึกความคิดเห็นได้ในขณะนี้');
    }
  }

  // 3. อัปเดตความคิดเห็น (เพิ่มการเช็ก 404 และ Try-Catch)
  update(id: string, dto: UpdateCommentDto): Comment {
    const index = this.comments.findIndex((c) => c.id === id);
    
    // หากไม่พบ ID ให้ส่ง HTTP 404 Not Found ทันที
    if (index === -1) {
      throw new NotFoundException(`ไม่พบความคิดเห็นที่ต้องการแก้ไข (ID: ${id})`);
    }

    try {
      this.comments[index] = { 
        ...this.comments[index], 
        ...dto 
      }; //
      return this.comments[index];
    } catch (error) {
      throw new InternalServerErrorException('เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
    }
  }

  // 4. ลบความคิดเห็น (เพิ่มการเช็ก 404)
  remove(id: string): void {
    const index = this.comments.findIndex((c) => c.id === id);
    
    if (index === -1) {
      throw new NotFoundException('ไม่สามารถลบได้เนื่องจากไม่พบความคิดเห็นดังกล่าว'); //
    }

    try {
      this.comments.splice(index, 1); //
    } catch (error) {
      throw new InternalServerErrorException('ระบบเกิดข้อผิดพลาดในการลบข้อมูล');
    }
  }
}