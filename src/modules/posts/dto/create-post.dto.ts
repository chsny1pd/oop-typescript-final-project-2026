import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { PostStatus } from '../interfaces/post.interface';

export class CreatePostDto {
  @IsString() @IsNotEmpty() title!: string;
  @IsString() @IsNotEmpty() content!: string;
  @IsEnum(PostStatus) status!: PostStatus;
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