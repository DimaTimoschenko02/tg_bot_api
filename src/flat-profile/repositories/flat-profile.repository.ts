import { DataSource, EntityRepository, Repository } from "typeorm";
import { FlatProfile } from "../entities/flat-profile";

@EntityRepository()
export class FlatProfileRepository extends Repository<FlatProfile> {
  constructor(dataSource: DataSource) {
    super(FlatProfile, dataSource.createEntityManager());
  }
}
