import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { WithIdAndTimestampEntity } from "../../common/entities/with-id-and-timestamp.entity";
import { Announcement } from "../../announcement/entities/announcement.entity";

@Entity({ name: "tg_flat-profile" })
export class FlatProfile extends WithIdAndTimestampEntity {
  @Column({ nullable: true, type: "int" })
  square?: number;

  @Column({ nullable: true, type: "int" })
  floor?: number;

  @Column({ name: "rooms_count", nullable: true, type: "int" })
  roomsCount: number;

  @OneToOne(() => Announcement, (announcement) => announcement.flatProfile)
  @JoinColumn({ name: "announcement_id" })
  announcement: Announcement;
}
