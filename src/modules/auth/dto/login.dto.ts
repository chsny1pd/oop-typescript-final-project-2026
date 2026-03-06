import { IsString, IsNotEmpty } from 'class-validator';

/**
 * DTO สำหรับ login
 */
export class LoginDto {

  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

}