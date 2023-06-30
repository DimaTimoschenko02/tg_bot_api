import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateFavouriteDto } from "./dtos/create-favourite.dto";
import { GetUserIdFromRequest } from "../common/decorators/get-user-id-from-request.decorator";
import { FavouritesService } from "./favourites.service";
import { PostgresIdDto } from "../common/dtos/postgres-id.dto";
import { Announcement } from "../announcement/entities/announcement.entity";

@Controller("favourites")
@UseGuards(JwtAuthGuard)
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Post()
  public async addToFavourites(
    @Body() { announcementId }: CreateFavouriteDto,
    @GetUserIdFromRequest() userId: number
  ): Promise<void> {
    await this.favouritesService.addToFavourites(announcementId, userId);
  }

  @Get()
  public async getUserFavourites() {
    return await this.favouritesService.getUserFavourites(29);
  }
}
