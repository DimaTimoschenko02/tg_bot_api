import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { GetUserIdFromRequest } from "../common/decorators/get-user-id-from-request.decorator";
import { UpdateProfileDto } from "./dtos/update-profile.dto";
import { GetUserEmailFromRequest } from "../common/decorators/get-user-email-from-request.decorator";
import { ConfirmationCodeDto } from "./dtos/confirmation-code.dto";

@Controller("profile")
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Put()
  public async updateProfile(
    @GetUserIdFromRequest() userId: number,
    @Body() { profile }: UpdateProfileDto
  ): Promise<void> {
    await this.profileService.updateProfile(profile, userId);
  }

  @Get(":id")
  public async getProfile(@Param("id") id: number) {
    return await this.profileService.getProfileById(id);
  }

  @Get("confirm/email")
  public async sendConfirmEmailMessage(
    @GetUserIdFromRequest() id: number
  ): Promise<void> {
    await this.profileService.sendConfirmEmailMessage(id);
  }

  @Patch("confirm/email/:code")
  public async confirmEmail(
    @GetUserIdFromRequest() id: number,
    @Param() { code }: ConfirmationCodeDto
  ): Promise<void> {
    return this.profileService.confirmEmail(id, code);
  }
}
