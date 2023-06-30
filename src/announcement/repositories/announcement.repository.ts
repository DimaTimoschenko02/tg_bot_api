import { DataSource, EntityRepository, Repository } from "typeorm";
import { Announcement } from "../entities/announcement.entity";
import { GetFilteredAnnouncementsDto } from "../dtos/get-filtered-announcements.dto";
import { AnnouncementStatusEnum } from "../enums/announcement-status.enum";
import { GetUserAnnouncementsDto } from "../dtos/get-user-announcements.dto";

@EntityRepository()
export class AnnouncementRepository extends Repository<Announcement> {
  constructor(dataSource: DataSource) {
    super(Announcement, dataSource.createEntityManager());
  }

  public async findAllAnnouncementsByUserWithFlatProfileAndFiles(
    userId: number
  ): Promise<Announcement[]> {
    console.log(userId);
    const query = this.createQueryBuilder("announcement")
      .leftJoinAndSelect("announcement.flatProfile", "flatProfile")
      .leftJoinAndSelect("announcement.files", "files")
      .leftJoin("announcement.user", "user")
      .select([
        "announcement.id",
        "announcement.title",
        "announcement.description",
        "announcement.price",
        "announcement.views",
        "announcement.status",
        "flatProfile.square",
        "flatProfile.floor",
        "flatProfile.roomsCount",
        "files",
      ])
      .where("user.user_id = :userId", { userId });

    return await query.getMany();
  }

  public async getFilteredAnnouncement(
    userId: number,
    {
      limit,
      offset,
      city,
      floor,
      priceMax,
      priceMin,
      roomsCount,
      square,
      category,
    }: GetFilteredAnnouncementsDto
  ) {
    const query = this.createQueryBuilder("announcement")
      .leftJoinAndSelect("announcement.files", "files")
      .leftJoinAndSelect("announcement.category", "category")
      .leftJoinAndSelect("announcement.city", "city")
      .leftJoinAndSelect("announcement.flatProfile", "flatProfile")
      .leftJoinAndSelect("announcement.user", "user")
      .select([
        "announcement.title",
        "announcement.price",
        "announcement.views",
        "announcement.description",
        "files.key",
        "announcement.id",
        "user",
      ])
      .where("category.category = :category", { category })
      .andWhere("user.id != :userId", { userId })
      .andWhere("city.name = :city", { city })
      .andWhere("announcement.status = :status", {
        status: AnnouncementStatusEnum.ACTIVE,
      });

    if (floor) {
      query.andWhere("flatProfile.floor = :floor", { floor });
    }

    if (priceMax) {
      query.andWhere("announcement.price <= :priceMax", { priceMax });
    }

    if (priceMin) {
      query.andWhere("announcement.price >= :priceMin", { priceMin });
    }

    if (roomsCount) {
      query.andWhere("flatProfile.roomsCount = :roomsCount", {
        roomsCount,
      });
    }
    return query.limit(limit).getMany();
    // if (square) {
    //   query.andWhere("flatProfile.square = :square", { square });
    // }
  }

  public async getFullAnnouncementInfo(
    announcementId: number
  ): Promise<Announcement> {
    return this.createQueryBuilder("announcement")
      .leftJoinAndSelect("announcement.files", "files")
      .leftJoinAndSelect("announcement.category", "category")
      .leftJoinAndSelect("announcement.city", "city")
      .leftJoinAndSelect("announcement.files", "files")
      .leftJoinAndSelect("announcement.flatProfile", "flatProfile")
      .select(["announcement", "files.key", "category.category", "city.name"])
      .where("announcement.id = :announcementId", { announcementId })
      .getOne();
  }
}
