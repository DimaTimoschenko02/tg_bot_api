import { AnnouncementDto } from "./announcement.dto";
import { IsNotEmptyObject, IsObject, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateAnnouncementDto {
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AnnouncementDto)
  announcement: AnnouncementDto;
}
