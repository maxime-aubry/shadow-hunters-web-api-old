import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LocalAuthSignUpDto {
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
  public readonly firstname: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  public readonly lastname: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  public readonly username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  public readonly email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  public readonly password: string;
}
