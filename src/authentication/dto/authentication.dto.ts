import { IsEmail, IsNotEmpty, IsString, IsDefined } from 'class-validator';

export class AuthenticationDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  password: string;
}
