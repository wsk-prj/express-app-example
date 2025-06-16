import { IsEmail, IsString, Length, Matches } from "class-validator";

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @Length(8, 20)
  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/)
  password!: string;

  @IsString()
  @Length(2, 10)
  nickname!: string;
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}

export class CheckEmailDto {
  @IsEmail()
  email!: string;
}

export class CheckNicknameDto {
  @IsString()
  @Length(2, 10)
  nickname!: string;
}
