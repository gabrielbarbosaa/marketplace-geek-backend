import { CreateUserDto } from './dtos/createUser.dto';
import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { ReturnUserDto } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService){}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto){
    return this.userService.createUser(createUserDto)
  }

  @Get()
  async getAllUser():Promise<ReturnUserDto[]>{
    const users = await this.userService.getAllUser();
    return users.map(userEntity => new ReturnUserDto(userEntity))
  }
}
