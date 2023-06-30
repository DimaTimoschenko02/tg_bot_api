import { WithIdAndTimestampEntity } from "../../common/entities/with-id-and-timestamp.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { State } from "../../state/entities/state.entity";
import { Announcement } from "../../announcement/entities/announcement.entity";

@Entity({ name: "tg_city" })
export class City extends WithIdAndTimestampEntity {
  @Column({ nullable: false, unique: false })
  name: string;

  @ManyToOne(() => State, (state) => state.cities)
  state: State;

  @OneToMany(() => Announcement, (announcement) => announcement.city)
  announcements: Announcement[];
}
