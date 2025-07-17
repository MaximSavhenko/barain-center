import { IsEmail, IsOptional, IsString } from 'class-validator'

export class UserDto {
  @IsString()
  @IsOptional()
  email?: string

  @IsOptional()
  @IsString()
  password?: string

  @IsOptional()
  @IsString()
  name?: string
}