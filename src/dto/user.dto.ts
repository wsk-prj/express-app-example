import { IsString, IsEmail, IsOptional, Length, Matches } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(8, 20)
  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/)
  password?: string;

  @IsOptional()
  @IsString()
  @Length(2, 10)
  nickname?: string;
}
