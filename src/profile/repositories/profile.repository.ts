import { DataSource, EntityRepository, Repository } from "typeorm";
import { Profile } from "../entities/profile.entity";

@EntityRepository()
export class ProfileRepository extends Repository<Profile> {
  constructor(dataSource: DataSource) {
    super(Profile, dataSource.createEntityManager());
  }
}
