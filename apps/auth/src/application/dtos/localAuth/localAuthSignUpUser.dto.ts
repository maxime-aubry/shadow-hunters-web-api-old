import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LocalAuthSignUpUserDto {
  constructor(firstname: string, lastname: string, username: string, email: string, password: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  public firstname: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  public lastname: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  public username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  public email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  public password: string;
}
