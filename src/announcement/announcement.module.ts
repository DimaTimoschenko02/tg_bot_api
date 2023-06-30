import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Announcement } from "./entities/announcement.entity";
import { AnnouncementService } from "./announcement.service";
import { AnnouncementRepository } from "./repositories/announcement.repository";
import { AnnouncementController } from "./announcement.controller";
import { UserModule } from "../user/user.module";
import { AnnouncementCategoryModule } from "../announcement-category/announcement-category.module";
import { CityModule } from "../city/city.module";
import { FlatProfileModule } from "../flat-profile/flat-profile.module";
import { FileModule } from "../file/file.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Announcement]),
    UserModule,
    AnnouncementCategoryModule,
    CityModule,
    FlatProfileModule,
    FileModule,
    AnnouncementCategoryModule,
  ],
  providers: [AnnouncementService, AnnouncementRepository],
  controllers: [AnnouncementController],
  exports: [AnnouncementService],
})
export class AnnouncementModule {}
