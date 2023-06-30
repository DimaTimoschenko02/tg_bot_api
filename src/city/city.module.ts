import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { City } from "./entities/city.entity";
import { CityService } from "./city.service";
import { CityRepository } from "./repositories/city.repository";
import { CustomCacheModule } from "../cache/cache.module";
import { StateModule } from "../state/state.module";
import { CityController } from "./city.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([City]),
    CustomCacheModule,
    forwardRef(() => StateModule),
  ],
  exports: [CityService, CityRepository],
  providers: [CityService, CityRepository],
  controllers: [CityController],
})
export class CityModule {}
