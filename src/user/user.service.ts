import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity>{
    const saltOfRound = 10;
    const passwordHashed = await hash(createUserDto.password, saltOfRound);

    const user = {
      ...createUserDto,
      typeUser: 1,
      password: passwordHashed,
    }

    return this.userRepository.save(user)
  }

  async getAllUser():Promise<UserEntity[]>{
    return this.userRepository.find()
  }

  async getUserById(id: number):Promise<UserEntity>{
    return this.userRepository.findOneBy({id: id})
  }

}
