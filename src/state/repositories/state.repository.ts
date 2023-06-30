import { DataSource, Entity, EntityRepository, Repository } from "typeorm";
import { State } from "../entities/state.entity";

@EntityRepository()
export class StateRepository extends Repository<State> {
  constructor(dataSource: DataSource) {
    super(State, dataSource.createEntityManager());
  }
}
