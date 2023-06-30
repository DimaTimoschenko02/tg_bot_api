import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { IsNull } from "typeorm";

export class UserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  userName?: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
