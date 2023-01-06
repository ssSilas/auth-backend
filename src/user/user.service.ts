import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor( 
    @Inject('USER_REPOSITORY')
    private readonly userRepo: typeof UserEntity
  ){}

  async findAll(){
    return await this.userRepo.findOne({
      attributes:['name', 'email', 'status']
    });
  }

  async findByEmail(email:string)
    {
      try {
        return await this.userRepo.findOne({
          attributes: ['id', 'email', 'company', 'password' ],
          where:{email}
        }); 
      } catch (error) {
        throw new NotFoundException(error.message);
      }
  }

  async login( email:string, senha:string ){
    return {
      email,
      senha
    }
  }
}
