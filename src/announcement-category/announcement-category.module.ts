import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { AnnouncementCategoryService } from "./announcement-category.service";
import { CategoryRepository } from "./repositories/category.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [AnnouncementCategoryService, CategoryRepository],
  exports: [AnnouncementCategoryService],
})
export class AnnouncementCategoryModule {}
