import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

/**
 * DTO สำหรับสร้าง comment
 */
export class CreateCommentDto {

  @IsString()
  @IsNotEmpty()
  postId!: string;

  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsString()
  @IsNotEmpty()
  author!: string;
}

/**
 * DTO สำหรับแก้ไข comment
 */
export class UpdateCommentDto {

  @IsString()
  @IsOptional()
  message?: string;
}