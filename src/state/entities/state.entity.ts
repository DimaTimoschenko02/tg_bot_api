import { WithIdAndTimestampEntity } from "../../common/entities/with-id-and-timestamp.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { City } from "../../city/entities/city.entity";

@Entity({ name: "tg_state" })
export class State extends WithIdAndTimestampEntity {
  @Column({ name: "state_name", nullable: false, unique: true })
  name: string;

  @OneToMany(() => City, (city) => city.state)
  cities: City[];
}
