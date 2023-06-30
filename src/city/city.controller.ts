import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { CityService } from "./city.service";
import { CityType } from "./types/city.type";
import { StateNameDto } from "../state/dto/state-name.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("city")
// @UseGuards(JwtAuthGuard)
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get(":state")
  public async getCitiesNamesByState(
    @Param() { state }: StateNameDto
  ): Promise<Array<CityType>> {
    return await this.cityService.getCitiesNamesByState(state);
  }
}
