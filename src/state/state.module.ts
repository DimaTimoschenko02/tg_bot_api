import { forwardRef, Module } from "@nestjs/common";
import { StateRepository } from "./repositories/state.repository";
import { StateService } from "./state.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { State } from "./entities/state.entity";
import { CityModule } from "../city/city.module";
import { StateController } from "./state.controller";
import { CustomCacheModule } from "../cache/cache.module";

@Module({
  imports: [TypeOrmModule.forFeature([State]), CityModule, CustomCacheModule],
  exports: [StateService],
  providers: [StateRepository, StateService],
  controllers: [StateController],
})
export class StateModule {}
