import { PhoneStatusEnum } from "../enums/phone-status.enum";
import { EmailStatusEnum } from "../enums/email-status.enum";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ProfileDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @IsEnum(PhoneStatusEnum)
  phoneStatus?: PhoneStatusEnum;

  @IsOptional()
  @IsEnum(EmailStatusEnum)
  emailStatus?: EmailStatusEnum;
}
