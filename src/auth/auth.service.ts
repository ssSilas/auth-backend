import { Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { createHash } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/user.entity';
import config from 'helpers/db/config';
import { CreateUserDto, UserDataForTokenDto } from 'helpers/dto/user.dto';

@Injectable()
export class Tokengenerate {
  constructor(
    private readonly jwtService: JwtService
  ) { }

  async tokenApidot8(user: UserDataForTokenDto, server: string) {
    const secretKey: string = config().secretKey;

    const duration_token_web: string = config().durationToken;//horas : minutos
    let duration: string = duration_token_web;
    let date = Date.now();
    let time = duration.split(':');
    let hours: number = parseInt(time[0]);
    let minutes = parseInt(time[1]);
    let oneMinute = 60000;

    let expiration = date + hours * 60 * oneMinute + minutes * oneMinute;

    const objTokengenerate: object = {
      iss: server,
      aud: server,
      exp: parseInt(expiration.toString().slice(0, 10)),
      iat: Math.round(date / 1000),
      nbf: Math.round(date / 1000),
      data: {
        id: user.id,
        email: user.email,
        company: user.company
      }
    }
    return this.jwtService.sign(objTokengenerate, { secret: secretKey, algorithm: 'HS256', })
  }
}
@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepo: typeof UserEntity,

    private readonly tokenGenerate: Tokengenerate,
    private readonly userService: UserService
  ) { }

  async createUser(body: CreateUserDto){
    const generatePass = this.createHashForPass(body.password)
    return await this.userRepo.create({
      // d
    })
  }

  async login(user: UserDataForTokenDto, host: string) {
    const response = await this.tokenGenerate.tokenApidot8(user, host)
    return { token: response }
  }

  async validateUser(email: string, password: string) {
    let user: UserEntity
    let compare: boolean

    const passForCompare = this.createHashForPass(password)
    try {
      user = await this.userService.findByEmail(email)
      compare = passForCompare === user.password;
    } catch (error) {
      console.log(error)
      return null
    }

    const response: object = {
      id: user.id,
      email: user.email,
      company: user.company
    }

    if (!compare) return null
    return response
  }

  createHashForPass( password:string ){
    const salt: string = config().salt;
    const baseHash = String(salt + password)
    const hash = createHash('sha1').update(baseHash).digest('hex')
    return hash
  }
}