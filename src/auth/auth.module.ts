import { Module } from "@nestjs/common";
import { CustomConfigModule } from "../custom-config/custom-config.module";
import { JwtAuthStrategy } from "./strategies/jwt-auth.strategy";

@Module({
  imports: [CustomConfigModule],
  providers: [JwtAuthStrategy],
})
export class AuthModule {}
