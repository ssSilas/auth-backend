import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { dbManager } from "helpers/db/database.providers";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ 
      usernameField: 'login',
      passwordField: 'password'
    })
  }
  
  async validate(login:string, password:string){
    //open manager conection
    await dbManager()
    try {
      const user = await this.authService.validateUser(login, password)
      if(!user) throw new UnauthorizedException({message: "Email e/ou senha inválidos"})
      return user 
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}