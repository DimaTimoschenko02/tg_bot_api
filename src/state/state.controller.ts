import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { StateService } from "./state.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { StateType } from "./types/state.type";

@Controller("state")
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post("group-by")
  public async groupBy() {
    await this.stateService.groupBy();
  }

  @Post("migrate")
  public async migrate() {
    await this.stateService.migrate();
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  public async getStates(): Promise<Array<StateType>> {
    return await this.stateService.getStatesNames();
  }
}
