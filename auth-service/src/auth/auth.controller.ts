import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('signInWithOAuth')
  signInWithOAuth(user: string) {
    return this.authService.signInWithOAuth(user);
  }

  @MessagePattern('signInWithCredentials')
  signInWithCredentials(signInDto: any) {
    return this.authService.signInWithCredentials(signInDto);
  }
}
