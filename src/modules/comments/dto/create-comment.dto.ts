// create-comment.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsString() 
  @IsNotEmpty({ message: 'postId ห้ามว่าง' })
  postId!: string;

  @IsString({ message: 'ข้อความต้องเป็นตัวอักษร' })
  @IsNotEmpty({ message: 'กรุณาใส่ข้อความความคิดเห็น' })
  message!: string;

  @IsString() 
  @IsNotEmpty({ message: 'ระบุชื่อผู้เขียนด้วยครับ' })
  author!: string;
}

export class UpdateCommentDto {
  // แก้ไข: เพิ่ม ? และ @IsOptional เพื่อให้เลือกแก้แค่บางอย่างได้
  @IsString() @IsOptional() message?: string; 
  @IsString() @IsOptional() author?: string;  
}


// import { IsString, IsNotEmpty, MinLength } from 'class-validator';
// export class CreateCommentDto {
//   @IsString()
//   @IsNotEmpty()
//   postId: string;

//   @IsString()
//   @IsNotEmpty()
//   author: string;

//   @IsString()
//   @IsNotEmpty()
//   @MinLength(3)
//   content: string;
// }