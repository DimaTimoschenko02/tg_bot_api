import { WithIdAndTimestampEntity } from "../../common/entities/with-id-and-timestamp.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity("smart-alert")
export class SmartAlert extends WithIdAndTimestampEntity {
  @ManyToOne(() => User, (user) => user.smartAlerts)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "jsonb", nullable: false })
  filters: Record<any, any>;
}
