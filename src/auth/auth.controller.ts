import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'helpers/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: any){
    try {
      const { headers } = req
      return await this.authService.login(req.user, headers.host) 
    } catch (error) {
      throw error
    }
  }

  @Post('add-user')
  async createUser(@Body() body: CreateUserDto){
    try {
      return await this.authService.createUser(body) 
    } catch (error) {
      throw error
    }
  }
}
