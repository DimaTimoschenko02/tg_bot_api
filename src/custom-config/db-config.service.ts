import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { CustomConfigService } from "./custom-config.service";
import { Profile } from "../profile/entities/profile.entity";
import { User } from "../user/entities/user.entity";
import { Announcement } from "../announcement/entities/announcement.entity";
import { Category } from "../announcement-category/entities/category.entity";
import { State } from "../state/entities/state.entity";
import { City } from "../city/entities/city.entity";
import { File } from "../file/entities/file.entity";
import { FlatProfile } from "../flat-profile/entities/flat-profile";
import { Favourites } from "../favourites/entities/favourites.entity";
import { SmartAlert } from "../smart-alert/entities/smart-alert.entity";

@Injectable()
export class DbConfigService {
  private readonly redisCacheConnectionUrl: string;
  private readonly postgresConnectionOptions: TypeOrmModuleOptions;
  constructor(private readonly configService: CustomConfigService) {
    this.redisCacheConnectionUrl =
      this.configService.get<string>("REDIS_CACHE_LINK");

    this.postgresConnectionOptions = {
      type: "postgres",
      url: this.configService.get<string>("POSTGRES_URL"),
      entities: [
        User,
        Profile,
        Announcement,
        Category,
        State,
        City,
        File,
        FlatProfile,
        Favourites,
        SmartAlert,
      ],
      synchronize: true,
      logging: false,
    };
  }

  public getDbConnectionOption(): TypeOrmModuleOptions {
    return this.postgresConnectionOptions;
  }

  public getRedisCacheConnectionUrl(): string {
    return this.redisCacheConnectionUrl;
  }
}
