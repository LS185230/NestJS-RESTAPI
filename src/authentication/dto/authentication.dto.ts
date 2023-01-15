import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsDefined,
} from 'class-validator';

export class AuthenticationDTO {
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  password: string;
}
