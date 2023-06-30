import { Module } from "@nestjs/common";
import { CustomConfigModule } from "../custom-config/custom-config.module";
import { MailService } from "./mail.service";
import { CustomCacheModule } from "../cache/cache.module";

@Module({
  imports: [CustomConfigModule, CustomCacheModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
