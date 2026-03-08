import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * Controller สำหรับ API user
 */
@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService
  ) {}

  /**
   * GET /users
   * ดึง user ทั้งหมด
   */
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * GET /users/:id
   */
  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return this.usersService.findOne(id);
  }

  /**
   * POST /users
   */
  @Post()
  create(
    @Body() dto: CreateUserDto
  ) {
    return this.usersService.registerUser(dto);
  }

  /**
   * PATCH /users/:id
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto
  ) {
    return this.usersService.update(id, dto);
  }

  /**
   * DELETE /users/:id
   */
  @Delete(':id')
  remove(
    @Param('id') id: string
  ) {
    return this.usersService.remove(id);
  }

}