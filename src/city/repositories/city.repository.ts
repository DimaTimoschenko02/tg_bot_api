import { DataSource, EntityRepository, Repository } from "typeorm";
import { City } from "../entities/city.entity";

@EntityRepository()
export class CityRepository extends Repository<City> {
  constructor(dataSource: DataSource) {
    super(City, dataSource.createEntityManager());
  }
}
