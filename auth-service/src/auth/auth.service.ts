import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService) {}
  
  async signInWithOAuth(user: any) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const email = user['email'];

    const userExists = await this.usersService.findUserByEmail(email);
    console.log(userExists);

    if (!userExists) {
      this.usersService.create(email);
    }

    const newUser = await this.usersService.findUserByEmail(email);
    const payload = { sub: email, _id: newUser._id }
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }

  async signInWithCredentials(signInDto: any) {
    const email = signInDto.email;
    const pass = signInDto.password;

    try {
      const user = await this.usersService.findUserByEmail(email);

      if (!comparePasswords(pass, user?.password)) {
          throw new UnauthorizedException();
      }
      
      const payload = { sub: email, _id: user._id };
      return {
          access_token: await this.jwtService.signAsync(payload),
      };
  } catch {
      throw new UnauthorizedException();
  }
  }
}
