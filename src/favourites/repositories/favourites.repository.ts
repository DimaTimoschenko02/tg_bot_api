import { DataSource, EntityRepository, Repository } from "typeorm";
import { Favourites } from "../entities/favourites.entity";
import { Announcement } from "../../announcement/entities/announcement.entity";

@EntityRepository(Favourites)
export class FavouritesRepository extends Repository<Favourites> {
  constructor(dataSource: DataSource) {
    super(Favourites, dataSource.createEntityManager());
  }
  //TODO add limit offset
  public async getUserFavourites(userId: number) {
    //TODO add select somehow
    return (
      this.createQueryBuilder("favourites")
        .leftJoinAndSelect("favourites.announcement", "announcement")
        .leftJoinAndSelect("announcement.category", "category")
        .leftJoinAndSelect("announcement.city", "city")
        .leftJoinAndSelect("announcement.files", "files")
        .leftJoinAndSelect("announcement.flatProfile", "flatProfile")
        .where("favourites.user.id = :userId", { userId })
        // .select([
        //   "announcement.price",
        //   "category.category",
        //   // "city.name",
        //   // "files",
        //   // "flatProfile",
        //   // "favourites.announcement",
        // ])
        .getMany()
    );
  }
}
