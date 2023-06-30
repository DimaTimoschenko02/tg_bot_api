import { ProfileDto } from "./profile.dto";
import { IsNotEmptyObject, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class UpdateProfileDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ProfileDto)
  profile: ProfileDto;
}
