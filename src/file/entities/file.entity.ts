import { WithIdAndTimestampEntity } from "../../common/entities/with-id-and-timestamp.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Announcement } from "../../announcement/entities/announcement.entity";

@Entity({ name: "td_file" })
export class File extends WithIdAndTimestampEntity {
  @Column({ nullable: false, unique: true })
  key: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @ManyToOne(() => Announcement, (announcement) => announcement.files)
  announcement: Announcement;
}
