import { DataSource, EntityRepository, Repository } from "typeorm";
import { Category } from "../entities/category.entity";

@EntityRepository()
export class CategoryRepository extends Repository<Category> {
  constructor(dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }
}
