import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FavouritesRepository } from "./repositories/favourites.repository";
import { AnnouncementService } from "../announcement/announcement.service";
import { UserService } from "../user/user.service";

@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(FavouritesRepository)
    private readonly favouritesRepository: FavouritesRepository,
    private readonly announcementService: AnnouncementService,
    private readonly userService: UserService
  ) {}

  public async addToFavourites(
    announcementId: number,
    userId: number
  ): Promise<void> {
    const [announcement, user] = await Promise.all([
      this.announcementService.isExistsAnnouncement(announcementId),
      this.userService.isExistsUser(userId),
    ]);

    const isExists = await this.favouritesRepository.findOne({
      where: { user: { id: user.id }, announcement: { id: announcementId } },
    });

    //TODO remove add to favourites button from bot if user already added it
    if (isExists) return;

    await this.favouritesRepository.save({
      user,
      announcement,
    });
  }

  public async getUserFavourites(userId: number) {
    return this.favouritesRepository.getUserFavourites(userId);
  }
}
