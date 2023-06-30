import { UserDto } from "./user.dto";
import { IsNotEmptyObject, ValidateNested } from "class-validator";
import { User } from "../entities/user.entity";
import { Type } from "class-transformer";

export class SignUpUserDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;
}
