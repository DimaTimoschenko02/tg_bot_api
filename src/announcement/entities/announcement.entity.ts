import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Category } from "../../announcement-category/entities/category.entity";
import { City } from "../../city/entities/city.entity";
import { File } from "../../file/entities/file.entity";
import { FlatProfile } from "../../flat-profile/entities/flat-profile";
import { WithIdAndTimestampEntity } from "../../common/entities/with-id-and-timestamp.entity";
import { AnnouncementStatusEnum } from "../enums/announcement-status.enum";
import { Favourites } from "../../favourites/entities/favourites.entity";

@Entity({ name: "tg_announcement" })
export class Announcement extends WithIdAndTimestampEntity {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ type: "int", nullable: false })
  price: number;

  @Column({ type: "int", nullable: false })
  views: number;

  @ManyToOne(() => User, (user) => user.announcements, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Category, (category) => category.announcement)
  category: Category;

  @ManyToOne(() => City, (city) => city.announcements)
  city: City;

  @OneToMany(() => File, (file) => file.announcement, { nullable: true })
  files?: File[];

  @OneToOne(() => FlatProfile, (flatProfile) => flatProfile.announcement)
  flatProfile: FlatProfile;

  @Column({
    type: "enum",
    enum: AnnouncementStatusEnum,
    nullable: false,
    default: AnnouncementStatusEnum.PENDING,
  })
  status: AnnouncementStatusEnum = AnnouncementStatusEnum.PENDING;

  @OneToMany(() => Favourites, (favourites) => favourites.announcement)
  favourites: Favourites[];
}
