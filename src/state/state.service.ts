import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StateRepository } from "./repositories/state.repository";
import * as fs from "fs";
import { data } from "./ua";
import { assignWith, groupBy, isNil } from "lodash";
import { CityService } from "../city/city.service";
import { CityRepository } from "../city/repositories/city.repository";
import { groupedCities } from "./grouped";
import { CustomCacheModule } from "../cache/cache.module";
import { CacheService } from "../cache/cache.service";
import { StateType } from "./types/state.type";

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StateRepository)
    private readonly stateRepository: StateRepository,
    private readonly cityRepository: CityRepository,
    private readonly cacheService: CacheService
  ) {}
  public async groupBy() {
    const groupedBy = groupBy<{ admin_name: string; city: string }>(
      data,
      "admin_name"
    );

    fs.writeFileSync("./grouped.ts", JSON.stringify(groupedBy));
  }

  public async migrate() {
    Object.entries(groupedCities).map(async ([state, cities]) => {
      const newState = await this.stateRepository.save({
        stateName: state,
        cities: [],
      });

      await Promise.all(
        cities.map(({ city }) => {
          return this.cityRepository.save({
            name: city,
            state: newState,
          });
        })
      );
    });
  }

  public async getStateByName(name: string) {
    const state = await this.stateRepository.findOne({
      where: { name },
    });

    if (isNil(state)) throw new BadRequestException("StateDoesNotExists");

    return state;
  }

  public async getStatesNames(): Promise<Array<StateType>> {
    const statesFromCache = await this.cacheService.getStates();

    if (!isNil(statesFromCache)) {
      return statesFromCache;
    }
    const statesFromDb = await this.stateRepository.find({
      select: ["name"],
      order: { name: "ASC" },
    });

    this.cacheService.saveStates(statesFromDb).then();

    return statesFromDb;
  }
}
