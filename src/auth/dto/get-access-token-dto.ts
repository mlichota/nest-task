import { ApiProperty } from '@nestjs/swagger';

export class AccessToken {
  @ApiProperty({ example: 'Bearer token', description: 'Bearer token' })
  readonly access_token: string;
}
