import { DataSource, EntityRepository, Repository } from "typeorm";
import { SmartAlert } from "../entities/smart-alert.entity";

@EntityRepository(SmartAlert)
export class SmartAlertRepository extends Repository<SmartAlert> {
  constructor(dataSource: DataSource) {
    super(SmartAlert, dataSource.createEntityManager());
  }
}
