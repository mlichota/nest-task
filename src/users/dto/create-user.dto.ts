import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'User name' })
  readonly username: string;
  @ApiProperty({ example: 'pa$$w0rd!', description: 'User password' })
  readonly password: string;
}
