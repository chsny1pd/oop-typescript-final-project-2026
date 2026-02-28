import { IsString, IsNotEmpty, IsEnum, IsOptional, MinLength } from 'class-validator';
import { PostStatus } from '../interfaces/post.interface';

export class CreatePostDto {
  @IsString({ message: 'หัวข้อต้องเป็นตัวอักษร' })
  @IsNotEmpty({ message: 'หัวข้อห้ามว่าง' })
  @MinLength(3, { message: 'หัวข้อต้องยาวอย่างน้อย 3 ตัวอักษร' })
  title!: string;

  @IsString({ message: 'เนื้อหาต้องเป็นตัวอักษร' })
  @IsNotEmpty({ message: 'เนื้อหาห้ามว่าง' })
  content!: string;

  @IsEnum(PostStatus, { message: 'สถานะต้องเป็น draft หรือ published เท่านั้น' })
  status!: PostStatus;
}

// แยก DTO สำหรับการอัปเดต โดยใช้ @IsOptional เพื่อให้ส่งแค่บาง Field ได้
export class UpdatePostDto {
  @IsString() @IsOptional() title?: string;
  @IsString() @IsOptional() content?: string;
  @IsEnum(PostStatus) @IsOptional() status?: PostStatus;
}

// import { IsString, IsNotEmpty, MinLength } from 'class-validator';

// export class CreatePostDto {
//   @IsString()
//   @IsNotEmpty()
//   title: string;

//   @IsString()
//   @IsNotEmpty()
//   @MinLength(10, { message: 'เนื้อหาต้องมีความยาวอย่างน้อย 10 ตัวอักษร' })
//   content: string;

//   @IsString()
//   @IsNotEmpty()
//   author: string;
// }