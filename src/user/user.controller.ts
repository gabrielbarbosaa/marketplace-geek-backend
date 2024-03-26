import { CreateUserDto } from './dtos/createUser.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './interfaces/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService){}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto){
    return this.userService.createUser(createUserDto)
  }

  @Get()
  async getAllUser():Promise<UserEntity[]>{
    return this.userService.getAllUser()
  }
}
