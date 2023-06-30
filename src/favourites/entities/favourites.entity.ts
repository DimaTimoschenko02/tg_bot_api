import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { WithIdAndTimestampEntity } from "../../common/entities/with-id-and-timestamp.entity";
import { User } from "../../user/entities/user.entity";
import { Announcement } from "../../announcement/entities/announcement.entity";

@Entity("tg_user_favourites")
export class Favourites extends WithIdAndTimestampEntity {
  @ManyToOne(() => User, (user) => user.favourites, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Announcement, (announcement) => announcement.favourites, {
    nullable: false,
  })
  @JoinColumn({ name: "announcement_id" })
  announcement: Announcement;
}
