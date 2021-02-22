import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username: username.toLowerCase() });
  }

  async create(userData: CreateUserDto): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    const createdUser = new this.userModel({
      username: userData.username.toLowerCase(),
      password: hashedPassword,
    });
    const userSaved = await createdUser.save();
    if (userSaved) {
      return 'OK';
    }
  }
}
