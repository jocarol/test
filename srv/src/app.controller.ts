import { BadRequestException, Body, Controller, Get, Post, Put, Req, Res, UnauthorizedException } from '@nestjs/common';
import { UserService } from './app.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'
import { Response, Request, response, request } from 'express';
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

      const cookieData = await this.jwtService.verifyAsync(cookie)

      if (!cookieData) throw new UnauthorizedException();

      const user = await this.userService.findOne({ id: cookieData['id'] });

      const { password, ...userWithoutPassword } = user;

      return userWithoutPassword;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Put('edit')
  async edit(
    @Req() request: Request,
    @Body('phone') phone: any,
    @Body('email') email: any,
    @Body('password') password: any,
    @Res({ passthrough: true }) response: Response,
  ) {

    if (!phone && !email && !password) return

    const cookie = request.cookies['jwt']
    const cookieData = await this.jwtService.verifyAsync(cookie)

    if (!cookieData) throw new UnauthorizedException();

    const user = await this.userService.findOne({ id: cookieData['id'] });

    if (!user) throw new BadRequestException('L\'utilisateur n\'existe pas dans la base de donnée')

    let data: any = {}
    if (phone) {
      data.phone = phone
    }
    if (email) {
      data.email = email
    }
    if (password) {
      data.password = await bcrypt.hash(password, 12);
    }
    console.log(data)
    const newUser = await this.userService.update(cookieData['id'], data);

    return {
      newUser
    };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return { message: "Success" }
  }
}
