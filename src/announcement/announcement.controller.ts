import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AnnouncementService } from "./announcement.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { GetUserIdFromRequest } from "../common/decorators/get-user-id-from-request.decorator";
import { CreateAnnouncementDto } from "./dtos/create-announcement.dto";
import { Announcement } from "./entities/announcement.entity";
import { FilesInterceptor } from "@nestjs/platform-express";
import { GetFilteredAnnouncementsDto } from "./dtos/get-filtered-announcements.dto";
import { PostgresIdDto } from "../common/dtos/postgres-id.dto";
import { GetUserAnnouncementsResponseDto } from "./dtos/get-user-announcements-response.dto";

@Controller("announcement")
@UseGuards(JwtAuthGuard)
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Post()
  public async createAnnouncement(
    @GetUserIdFromRequest() id: number,
    @Body() { announcement }: CreateAnnouncementDto
  ): Promise<Announcement> {
    return await this.announcementService.createAnnouncement(id, announcement);
  }

  @Put(":id")
  @UseInterceptors(FilesInterceptor("files"))
  public async uploadAnnouncementPhotos(
    @GetUserIdFromRequest() userId: number,
    @UploadedFiles() files: Express.Multer.File[],
    @Param("id") announcementId: number
  ): Promise<Announcement> {
    return this.announcementService.addPhotosToAnnouncement(
      userId,
      announcementId,
      files
    );
  }

  @Get("/my")
  public async getUserAnnouncements(
    @GetUserIdFromRequest() id: number
  ): Promise<{ announcements: Announcement[] }> {
    const announcements = await this.announcementService.getUserAnnouncements(
      id
    );
    console.dir(announcements, { depth: null });
    return { announcements };
  }

  @Get("filtered")
  public async getFilteredAnnouncements(
    @Query() query: GetFilteredAnnouncementsDto,
    @GetUserIdFromRequest() userId: number
  ): Promise<Array<Announcement>> {
    return await this.announcementService.getFilteredAnnouncements(
      userId,
      query
    );
  }

  @Get("full-info/:id")
  public async getFullAnnouncementInfo(
    @Param() { id: announcementId }: PostgresIdDto
  ): Promise<Announcement> {
    return await this.announcementService.getFullAnnouncementInfo(
      announcementId
    );
  }

  @Post("fill-db")
  public async fillDb() {
    await this.announcementService.fillDb();

    return "Ok";
  }
}
