import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AnnouncementRepository } from "./repositories/announcement.repository";
import { AnnouncementDto } from "./dtos/announcement.dto";
import { UserService } from "../user/user.service";
import { AnnouncementCategoryService } from "../announcement-category/announcement-category.service";
import { CityService } from "../city/city.service";
import { chunk, isNil, pick, range, shuffle } from "lodash";
import { FlatProfileService } from "../flat-profile/flat-profile.service";
import { AnnouncementStatusEnum } from "./enums/announcement-status.enum";
import { Announcement } from "./entities/announcement.entity";
import { FileService } from "../file/file.service";
import { GetFilteredAnnouncementsDto } from "./dtos/get-filtered-announcements.dto";

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectRepository(AnnouncementRepository)
    private readonly announcementRepository: AnnouncementRepository,
    private readonly userService: UserService,
    private readonly categoryService: AnnouncementCategoryService,
    private readonly cityService: CityService,
    private readonly flatProfileService: FlatProfileService,
    private readonly fileService: FileService
  ) {}

  public async createAnnouncement(
    userId: number,
    announcement: AnnouncementDto
  ): Promise<Announcement> {
    const [user, category, city, profile] = await Promise.all([
      this.userService.getUserWithProfileById(userId, false),
      this.categoryService.getCategoryByName(announcement.category),
      this.cityService.getCityByName(announcement.city),
      this.flatProfileService.createProfile(announcement.flatProfile),
    ]);

    return this.announcementRepository.save({
      ...pick(announcement, ["title", "price", "description"]),
      category,
      city,
      user,
      views: 0,
      flatProfile: profile,
      files: [],
      status: AnnouncementStatusEnum.PENDING,
    });
  }

  public async getFullAnnouncementInfo(
    announcementId: number
  ): Promise<Announcement> {
    return this.announcementRepository.findOne({
      where: { id: announcementId },
      relations: ["user", "files", "category", "city", "flatProfile"],
    });
  }

  public async addPhotosToAnnouncement(
    userId: number,
    announcementId: number,
    files: Express.Multer.File[]
  ) {
    const announcement = await this.isExistsAnnouncement(announcementId, true);

    if (announcement.status !== AnnouncementStatusEnum.PENDING)
      throw new BadRequestException("AnnouncementAlreadyCreated");

    const newFiles = await Promise.all(
      files.map((file) =>
        this.fileService.createPublicFile({
          filename: file.filename,
          buffer: file.buffer,
        })
      )
    );

    await announcement.save();

    return this.announcementRepository.findOne({
      where: { id: announcementId },
      relations: { flatProfile: true, city: true, files: true, category: true },
    });
  }

  public async isExistsAnnouncement(id: number, flatProfile = false) {
    const announcement = await this.announcementRepository.findOne({
      where: { id },
      relations: {
        flatProfile,
      },
    });

    if (isNil(announcement))
      throw new BadRequestException("AnnouncementDoesNotExists");

    return announcement;
  }

  public async getUserAnnouncements(id: number): Promise<Announcement[]> {
    const announcements =
      await this.announcementRepository.findAllAnnouncementsByUserWithFlatProfileAndFiles(
        id
      );

    // console.log({
    //   file: await this.fileService.getFileByKey(announcements[0].files[0].name),
    // });

    return announcements;
  }

  public async getFilteredAnnouncements(
    userId: number,
    query: GetFilteredAnnouncementsDto
  ): Promise<Array<Announcement>> {
    console.log(query);
    return this.announcementRepository.getFilteredAnnouncement(userId, query);
  }

  public async fillDb() {
    const users = await this.userService.getAllUsers();
    const categories = await this.categoryService.getAllCategories();
    const kharkivCities = await this.cityService.getCitiesByState(
      "Poltavs’ka Oblast’"
    );
    // const poltavaCities = await this.cityService.getCitiesNamesByState(
    //   "Poltavs’ka Oblast’"
    // );

    const randomTitle = "some words with sense bla bla";
    const randomDescription =
      "some random description with normal words to understand something i think i need a little bit more, hmm and just random words like hog rider and log and fireball, and it i obvious that bodya is gat";

    const promises = chunk(range(0, 10000), 5000).map(async (chunk) => {
      return await Promise.all(
        chunk.map(async () => {
          const flatProfile = await this.flatProfileService.createProfile({
            square: Math.round(Math.random() * 100),
            floor: Math.round(Math.random() * 10),
            roomsCount: Math.round(Math.random() * 5),
          });

          return this.announcementRepository.save({
            title: shuffle(randomTitle).join(""),
            description: shuffle(randomDescription.split(" ")).join(""),
            price: Math.round(Math.random() * 5000),
            views: Math.round(Math.random() * 100),
            user: users[Math.round(Math.random())],
            city: kharkivCities[Math.round(Math.random() * 42)],
            status: AnnouncementStatusEnum.ACTIVE,
            flatProfile,
            category: categories[Math.round(Math.random() * 3)],
          } as Announcement);
        })
      );
    });

    for (const promise of promises) {
      try {
        await promise;
      } catch (err) {
        console.log(err);
      }
    }
  }
}
