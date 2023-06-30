import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Favourites } from "./entities/favourites.entity";
import { AnnouncementModule } from "../announcement/announcement.module";
import { UserModule } from "../user/user.module";
import { FavouritesService } from "./favourites.service";
import { FavouritesRepository } from "./repositories/favourites.repository";
import { FavouritesController } from "./favourites.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Favourites]),
    AnnouncementModule,
    UserModule,
  ],
  providers: [FavouritesService, FavouritesRepository],
  controllers: [FavouritesController],
  exports: [],
})
export class FavouritesModule {}
