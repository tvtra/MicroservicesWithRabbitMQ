import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { LoginGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Client({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'auth_service_queue',
      queueOptions: {
        durable: false
      },
    },
  })
  client: ClientProxy;

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.client.send('signInWithOAuth', req.user);
  }

  @Post('')
  signInWithCredentials(@Body() signInDto: Record<string, any>) {
    return this.client.send('signInWithCredentials', signInDto);
  }

  @UseGuards(LoginGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
