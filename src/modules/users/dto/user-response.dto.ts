/**
 * DTO สำหรับ response ของ user
 * ใช้กำหนดว่า API จะส่ง field อะไรกลับไป
 */
export class UserResponseDto {

  /** id ของ user */
  id!: string;

  /** username */
  username!: string;

  /** วันที่สร้าง */
  createdAt!: string;

}