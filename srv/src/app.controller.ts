import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { UserService } from './app.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'
import { Response, Request, response } from 'express';
import { resourceLimits } from 'worker_threads';

@Controller('api')
export class AppController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {
  }

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('phone') phone: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.userService.create({
      name,
      email,
      password: hashedPassword,
      phone,
    })

    delete user.password

    return user
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findOne({ email })

    if (!user) throw new BadRequestException('L\'utilisateur n\'existe pas dans la base de donnée')
    if (!await bcrypt.compare(password, user.password)) throw new BadRequestException('Identifiants incorrects')
    const jwt = await this.jwtService.signAsync({ id: user.id })

    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: "Succes"
    };
  }

  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt']

      const data = await this.jwtService.verifyAsync(cookie)

      if (!data) throw new UnauthorizedException();

      const user = await this.userService.findOne({ id: data['id'] });

      const {password, ...userWithoutPassword} = user;

      return userWithoutPassword;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Res({passthrough: true}) response: Response) {
    response.clearCookie('jwt');

    return {message: "Success"}
  }
}
