import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LocalAuthSignInDto {
  constructor(usernameOrEmail: string, password: string) {
    this.usernameOrEmail = usernameOrEmail;
    this.password = password;
  }

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  public readonly usernameOrEmail: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  public readonly password: string;
}
