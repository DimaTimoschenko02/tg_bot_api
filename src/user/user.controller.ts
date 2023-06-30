import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { SignUpUserDto } from "./dtos/sign-up-user.dto";
import { SignUpUserResponseDto } from "./dtos/sign-up-user-response.dto";
import { GetByIdDto } from "./dtos/get-by-id.dto";
import { User } from "./entities/user.entity";
import { RolesGuard } from "../common/guards/roles.guard";
import { UserRolesEnum } from "./enums/user-roles.enum";
import { Roles } from "../common/decorators/roles.decorator";
import { ChangeUserRoleDto } from "./dtos/change-user-role.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { omit } from "lodash";

@Controller("user")
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("sign-up")
  public async signUp(
    @Body() body: SignUpUserDto
  ): Promise<SignUpUserResponseDto> {
    return await this.userService.signUpUser(body.user);
  }

  @Roles(UserRolesEnum.ADMIN)
  @UseGuards(RolesGuard)
  @Post("delete/:id")
  public async deleteUser(@Param() { id }: GetByIdDto): Promise<void> {
    return await this.userService.deleteUser(id);
  }

  @Get(":id")
  public async getUserWithProfile(@Param() { id }: GetByIdDto): Promise<User> {
    const userWithProfile = await this.userService.getUserWithProfileById(id);

    return <User>omit(userWithProfile, ["id", "userId"]);
  }

  @Roles(UserRolesEnum.ADMIN)
  @UseGuards(RolesGuard)
  @Patch("add/admin/:id")
  public async changeUserRole(@Body() user: ChangeUserRoleDto): Promise<void> {
    return this.userService.changeUserRole(user);
  }
}
