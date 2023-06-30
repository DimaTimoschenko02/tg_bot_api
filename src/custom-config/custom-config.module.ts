import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { getEnvPath } from "../common/utils/get-env-path.util";
import { CustomConfigService } from "./custom-config.service";
import { DbConfigService } from "./db-config.service";
import { AwsConfigService } from "./aws-config.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvPath(),
    }),
  ],
  providers: [CustomConfigService, DbConfigService, AwsConfigService],
  exports: [CustomConfigService, DbConfigService, AwsConfigService],
})
export class CustomConfigModule {}
