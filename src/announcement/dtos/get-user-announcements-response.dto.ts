import { GetUserAnnouncementsDto } from "./get-user-announcements.dto";
import { ApiProperty } from "@nestjs/swagger";

export class GetUserAnnouncementsResponseDto {
  @ApiProperty({ type: () => GetUserAnnouncementsDto, isArray: true })
  announcements: GetUserAnnouncementsDto[];
}
