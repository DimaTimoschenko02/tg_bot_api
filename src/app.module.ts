import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CustomConfigModule } from "./custom-config/custom-config.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { ProfileModule } from "./profile/profile.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DbConfigService } from "./custom-config/db-config.service";
import { StateModule } from "./state/state.module";
import { CityModule } from "./city/city.module";
import { AnnouncementModule } from "./announcement/announcement.module";
import { AnnouncementCategoryModule } from "./announcement-category/announcement-category.module";
import { AwsS3Module } from "./aws/aws-s3.module";
import { CustomCacheModule } from "./cache/cache.module";
import { FavouritesModule } from "./favourites/favourites.module";
import { SmartAlertModule } from "./smart-alert/smart-alert.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      inject: [DbConfigService],
      useFactory: (configService: DbConfigService) =>
        configService.getDbConnectionOption(),
    }),
    CustomConfigModule,
    CustomCacheModule,
    AuthModule,
    UserModule,
    ProfileModule,
    StateModule,
    CityModule,
    AnnouncementModule,
    AnnouncementCategoryModule,
    AwsS3Module,
    CustomCacheModule,
    FavouritesModule,
    SmartAlertModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
