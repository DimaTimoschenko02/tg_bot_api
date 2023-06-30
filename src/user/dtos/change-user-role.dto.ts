import { pick } from "lodash";
import { UserDto } from "./user.dto";
import { PickType } from "@nestjs/swagger";
import { UserRolesEnum } from "../enums/user-roles.enum";
import { IsEnum } from "class-validator";

export class ChangeUserRoleDto extends PickType(UserDto, ["userId"]) {
  @IsEnum(UserRolesEnum)
  role: UserRolesEnum;
}
