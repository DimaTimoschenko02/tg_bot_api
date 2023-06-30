import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { GetUserIdFromRequest } from "./common/decorators/get-user-id-from-request.decorator";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { CacheService } from "./cache/cache.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly cacheService: CacheService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post("test")
  getHello(@GetUserIdFromRequest() id: number): string {
    return this.appService.getHello();
  }

  @Get()
  a(): string {
    return this.appService.getHello();
  }

  @Get("cache")
  public async clearCache() {
    await this.cacheService.clearCache();

    return "Ok";
  }
}
