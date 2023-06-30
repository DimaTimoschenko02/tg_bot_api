import { CacheModule, Module } from "@nestjs/common";
import { ClientOpts } from "redis";
import * as redisStore from "cache-manager-redis-store";
import { CustomConfigModule } from "../custom-config/custom-config.module";
import { DbConfigService } from "../custom-config/db-config.service";
import { CacheService } from "./cache.service";

@Module({
  imports: [
    CustomConfigModule,
    CacheModule.registerAsync<ClientOpts>({
      imports: [CustomConfigModule],
      inject: [DbConfigService],
      useFactory: (dbConfigService: DbConfigService) => {
        return {
          store: redisStore,
          url: dbConfigService.getRedisCacheConnectionUrl(),
          isGlobal: true,
          isCacheableValue: undefined,
        };
      },
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CustomCacheModule {}
