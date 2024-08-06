import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LocalAuthSignInUserDto {
  constructor(usernameOrEmail: string, password: string) {
    this.usernameOrEmail = usernameOrEmail;
    this.password = password;
  }

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  public usernameOrEmail: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  public password: string;
}
