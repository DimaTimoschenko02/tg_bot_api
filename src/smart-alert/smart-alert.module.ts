import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SmartAlert } from "./entities/smart-alert.entity";
import { SmartAlertService } from "./smart-alert.service";
import { SmartAlertRepository } from "./repositories/smart-alert.repository";

@Module({
  imports: [TypeOrmModule.forFeature([SmartAlert])],
  exports: [SmartAlertService],
  providers: [SmartAlertService, SmartAlertRepository],
})
export class SmartAlertModule {}
