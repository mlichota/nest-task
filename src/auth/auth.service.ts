import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/user.schema';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { username, _id } = user;
      return { username, _id };
    }
    return null;
  }

  async login(user: CreateUserDto) {
    const payload = { username: user.username, sub: user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(res, userData: CreateUserDto): Promise<any> {
    const { username } = userData;
    const userExists = await this.usersService.findOne(username);
    if (userExists) {
      return res.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: `User \'${username}\' arleady exists.`,
      });
    }
    await this.usersService.create(userData);
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: `User \'${username}\' has been created successfully`,
    });
  }
}
