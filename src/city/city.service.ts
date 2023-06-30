import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CityRepository } from "./repositories/city.repository";
import { CityType } from "./types/city.type";
import { StateService } from "../state/state.service";
import { isNil } from "lodash";
import { CacheService } from "../cache/cache.service";
import { isDefined } from "class-validator";

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityRepository)
    private readonly cityRepository: CityRepository,
    @Inject(forwardRef(() => StateService))
    private readonly stateService: StateService,
    private readonly cacheService: CacheService
  ) {}

  public async getCitiesByState(stateName: string) {
    const state = await this.stateService.getStateByName(stateName);

    return this.cityRepository.find({ where: { state: { id: state.id } } });
  }

  public async getCitiesNamesByState(
    stateName: string
  ): Promise<Array<CityType>> {
    const citiesFromCache = await this.cacheService.getCitiesByState(stateName);

    if (citiesFromCache) return citiesFromCache;

    const state = await this.stateService.getStateByName(stateName);

    const citiesNames = await this.cityRepository.find({
      where: { state: { id: state.id } },
      select: ["name"],
      order: { name: "ASC" },
    });

    this.cacheService.saveCitiesByState(stateName, citiesNames).then();

    return citiesNames;
  }

  public async getCityByName(name) {
    const city = await this.cityRepository.findOne({ where: { name } });

    if (isNil(city)) throw new BadRequestException("CityDoesNotExists");

    return city;
  }
}
