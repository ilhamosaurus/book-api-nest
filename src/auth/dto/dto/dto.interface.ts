import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  /* IsStrongPassword, */
} from 'class-validator';
import { Role } from './enums';
import { ApiProperty } from '@nestjs/swagger';

export class regisDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  /*  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }) */
  @ApiProperty({ type: String, description: 'Password' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'First Name' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Last Name' })
  lastName: string;

  @IsEnum(Role)
  @ApiProperty({ type: String, description: 'Role' })
  role: string;
}

export class loginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Password' })
  password: string;
}
