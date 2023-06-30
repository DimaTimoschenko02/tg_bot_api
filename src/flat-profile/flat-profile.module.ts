import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "../profile/entities/profile.entity";
import { ProfileService } from "../profile/profile.service";
import { ProfileRepository } from "../profile/repositories/profile.repository";
import { FlatProfile } from "./entities/flat-profile";
import { FlatProfileService } from "./flat-profile.service";
import { FlatProfileRepository } from "./repositories/flat-profile.repository";

@Module({
  imports: [TypeOrmModule.forFeature([FlatProfile])],
  providers: [FlatProfileService, FlatProfileRepository],
  exports: [FlatProfileService],
  controllers: [],
})
export class FlatProfileModule {}
