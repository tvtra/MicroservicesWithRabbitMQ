import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(email: string) {
    const newUser = new this.userModel({email: email});
    return newUser.save();
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    return this.userModel.findById(id);
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({email: email}).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const password = hashPassword(updateUserDto.password)
    return this.userModel.findByIdAndUpdate(id, { ...updateUserDto, password });
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
