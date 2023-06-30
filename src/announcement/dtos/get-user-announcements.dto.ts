import { AnnouncementDto } from "./announcement.dto";
import { FileDto } from "../../file/dto/file.dto";
import { ApiProperty } from "@nestjs/swagger";

export class GetUserAnnouncementsDto extends AnnouncementDto {
  @ApiProperty({ type: () => FileDto, isArray: true })
  files?: FileDto[];
}
