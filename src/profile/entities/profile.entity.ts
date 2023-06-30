import { WithIdAndTimestampEntity } from "../../common/entities/with-id-and-timestamp.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { PhoneStatusEnum } from "../enums/phone-status.enum";
import { User } from "../../user/entities/user.entity";
import { EmailStatusEnum } from "../enums/email-status.enum";

@Entity({ name: "td_user-profile" })
export class Profile extends WithIdAndTimestampEntity {
  @Column({ name: "first_name", nullable: true })
  firstName?: string;

  @Column({ name: "last_name", nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({
    type: "enum",
    enum: PhoneStatusEnum,
    name: "phone_status",
    default: PhoneStatusEnum.PENDING,
  })
  phoneStatus: PhoneStatusEnum = PhoneStatusEnum.PENDING;

  @Column({
    type: "enum",
    enum: EmailStatusEnum,
    name: "email_status",
    default: EmailStatusEnum.PENDING,
  })
  emailStatus: EmailStatusEnum = EmailStatusEnum.PENDING;

  @OneToOne(() => User, (user) => user.profile, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;
}
