import { IsString, IsEnum, IsOptional } from 'class-validator';
import { PostStatus } from '../interfaces/post.interface';

export class CreatePostDto {
  @IsString()
  title!: string;

  @IsString()
  content!: string;

  @IsEnum(PostStatus)
  status!: PostStatus;
}

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsEnum(PostStatus)
  @IsOptional()
  status?: PostStatus;
}