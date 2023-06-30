import { Column, Entity, OneToMany } from "typeorm";
import { WithIdAndTimestampEntity } from "../../common/entities/with-id-and-timestamp.entity";
import { Announcement } from "../../announcement/entities/announcement.entity";

@Entity({ name: "tg_announcement_category" })
export class Category extends WithIdAndTimestampEntity {
  @Column({ nullable: false, unique: true })
  category: string;

  @OneToMany(() => Announcement, (announcement) => announcement.category, {
    nullable: true,
  })
  announcement: Announcement[];
}
