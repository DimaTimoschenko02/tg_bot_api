import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SmartAlertRepository } from "./repositories/smart-alert.repository";

@Injectable()
export class SmartAlertService {
  constructor(
    @InjectRepository(SmartAlertRepository)
    private readonly smartAlertRepository: SmartAlertRepository
  ) {}
}
