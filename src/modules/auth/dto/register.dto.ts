import { IsString, IsNotEmpty } from 'class-validator';

/**
 * DTO สำหรับ register user ใหม่
 */
export class RegisterDto {

  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

}