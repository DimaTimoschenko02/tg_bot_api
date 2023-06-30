import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { WithIdAndTimestampEntity } from "../../common/entities/with-id-and-timestamp.entity";
import { Profile } from "../../profile/entities/profile.entity";
import { UserSubscriptionTypeEnum } from "../enums/user-subscription-type.enum";
import { Announcement } from "../../announcement/entities/announcement.entity";
import { UserRolesEnum } from "../enums/user-roles.enum";
import { Favourites } from "../../favourites/entities/favourites.entity";
import { SmartAlert } from "../../smart-alert/entities/smart-alert.entity";

@Entity({ name: "tg_user" })
export class User extends WithIdAndTimestampEntity {
  @Column({ nullable: true, name: "user_name" })
  userName?: string;

  @Column({ type: "int", unique: true, nullable: false, name: "user_id" })
  userId: number;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @Column({
    type: "enum",
    enum: UserSubscriptionTypeEnum,
    default: UserSubscriptionTypeEnum.DEFAULT,
    name: "user_subscription_type",
    nullable: false,
  })
  subscriptionType: UserSubscriptionTypeEnum = UserSubscriptionTypeEnum.DEFAULT;

  @OneToMany(() => Announcement, (announcement) => announcement.user, {
    nullable: true,
  })
  announcements: Announcement[];

  @OneToMany(() => Favourites, (favourites) => favourites.user)
  favourites: Favourites[];

  @Column({ type: "enum", enum: UserRolesEnum, default: UserRolesEnum.DEFAULT })
  role: UserRolesEnum = UserRolesEnum.DEFAULT;

  @OneToMany(() => SmartAlert, (smartAlert) => smartAlert.user, {
    nullable: true,
  })
  smartAlerts: SmartAlert[];
}
