import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AnnouncementRepository } from "../announcement/repositories/announcement.repository";
import { CategoryRepository } from "./repositories/category.repository";
import { isNil } from "lodash";

@Injectable()
export class AnnouncementCategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepository
  ) {}

  public async getCategoryByName(name: string) {
    const category = await this.categoryRepository.findOne({
      where: { category: name },
    });

    if (isNil(category)) throw new BadRequestException("CategoryDoesNotExists");

    return category;
  }

  public addFilesToAnnouncement(
    userId: number,
    announcementId: number,
    files: Express.Multer.File[]
  ) {}

  public async getAllCategories() {
    return this.categoryRepository.find();
  }
}
