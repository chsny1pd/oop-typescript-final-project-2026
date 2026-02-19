import { IsString, IsNotEmpty } from 'class-validator';
export class CreateCommentDto {
  @IsString() @IsNotEmpty() postId!:string;
  @IsString() @IsNotEmpty() message!: string; 
  @IsString() @IsNotEmpty() author!: string; 
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